const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./database')
const cors = require('cors')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const diceware = fs.readFileSync('diceware.txt', 'utf8').split('\n');

const hasPin = {};

app.use(cors())
app.use(bodyParser.json());

function getPassphrase() {
		const phrase1 = diceware[Math.floor(Math.random() * diceware.length)];
		const phrase2 = diceware[Math.floor(Math.random() * diceware.length)];
		
		const passphrase = phrase1 + '-' + phrase2;
		return passphrase;
};

async function checkPassphrase(passphrase) {
	const alreadyExists = await pool.query('SELECT * FROM trips WHERE id = $1', [passphrase])
	
	if (alreadyExists) {
		return false;
	}
	return true;
}

app.get('/getPassphrase', (req, res) => {
	
	let passphrase = getPassphrase();

	while (!checkPassphrase(passphrase)) {
		passphrase = getPassphrase();
	}

	res.send(passphrase);
  });

app.put('/addPin', async (req, res) => {
	try {
		console.log('we are here');
		console.log(req.body);
		const { passphrase } = req.body;
		const { pin } = req.body;
		// Hash the pin
		if (hasPin[passphrase]) {
			res.sendStatus(409);
			return;
		}
		console.log('we are here and the passphrase is');
		console.log(passphrase);
		console.log(pin);
		const hashedPin = await bcrypt.hash(pin, 10);
		await pool.query('UPDATE trips SET pin = $1 WHERE id = $2', [hashedPin, passphrase]);
		hasPin[passphrase] = true;
		res.sendStatus(200);
	} catch (err) {
		console.error(err)
		res.sendStatus(500);
	}
});

app.get('/hasPin/:passphrase', async (req, res) => {
	const { passphrase } = req.params;
	if (hasPin[passphrase]) {
		res.send(true);
	} else {
		res.send(false);
	}
});

app.post('/checkPin', async (req, res) => {
	try {
		const { passphrase } = req.body;
		const { pin } = req.body;
		const hashedPin = await pool.query('SELECT pin FROM trips WHERE id = $1', [passphrase]);
		if (await bcrypt.compare(pin, hashedPin)) {
			res.send(true);
		} else {
			res.send(false);
		}
	} catch (err) {
		console.error(err)
		res.sendStatus(500);
	}
});

app.get(('/:id/items'), async (req, res) => {
  try {
	const { id } = req.params
	const result = await pool.query(`
		SELECT items.*
		FROM items
		JOIN bags ON items.bag_id = bags.id
		WHERE bags.trip_id = $1
		ORDER BY items.id ASC`, [id])
	res.json(result.rows)
  } catch (err) {
	console.error(err)
  }
})

app.post(('/addItem/:bag_id'), async (req, res) => {
	try {
	  const { bag_id } = req.params
	  await pool.query(`INSERT INTO items (bag_id, is_checked, creation_date) 
	  					VALUES ($1, FALSE, CURRENT_TIMESTAMP)`, [bag_id])
	  res.sendStatus(200);
	} catch (err) {
	  console.error(err);
	  res.sendStatus(500);
	}
  })

  app.post(('/addBag/:passphrase'), async (req, res) => {
	try {
	  const { passphrase } = req.params
	  await pool.query(`INSERT INTO bags (title, color, trip_id, creation_date) 
	  					VALUES ('New Bag', 1, $1, CURRENT_TIMESTAMP)`, [passphrase])
	  res.sendStatus(200);
	} catch (err) {
	  console.error(err);
	  res.sendStatus(500);
	}
  })

  app.post(('/init/:passphrase'), async (req, res) => {
	try {
	  const { passphrase } = req.params
	  if (passphrase == 'undefined')
		return;
	  await pool.query(`INSERT INTO trips (id, last_modification) VALUES ($1, CURRENT_TIMESTAMP)`, [passphrase])
	  await pool.query(`INSERT INTO bags (title, color, trip_id, creation_date) VALUES ('Backpack', 0, $1, CURRENT_TIMESTAMP)`, [passphrase])
	  const result = await pool.query(`SELECT id FROM bags WHERE trip_id = $1`, [passphrase])
	  const bag_id = result.rows[0].id;
	  if (bag_id) {
		  await pool.query(`INSERT INTO items (title, bag_id, is_checked, creation_date) VALUES
							  ('Change Item Name', $1, FALSE, CURRENT_TIMESTAMP)`, [bag_id])
	  }
	  res.sendStatus(200);
	} catch (err) {
	  console.error(err);
	  res.sendStatus(500);
	}
  })

  app.delete(('/deleteItem/:item_id'), async (req, res) => {
	try {
	  const { item_id } = req.params
	  await pool.query('DELETE FROM items WHERE id = $1', [item_id])
	  res.sendStatus(200);
	} catch (err) {
		console.error(err);
	  res.sendStatus(500);
	}
  })

  app.delete(('/deleteBag/:bag_id'), async (req, res) => {
	try {
	  const { bag_id } = req.params
	  await pool.query('DELETE FROM items WHERE bag_id = $1', [bag_id])
	  await pool.query('DELETE FROM bags WHERE id = $1', [bag_id])
	  res.sendStatus(200);
	} catch (err) {
		console.error(err);
	  res.sendStatus(500);
	}
  })

app.put(('/changeChecker/:id'), async (req, res) => {
	try {
	  const { id } = req.params
	  await pool.query('UPDATE items SET is_checked = NOT is_checked WHERE id = $1', [id])
	  res.sendStatus(200);
	} catch (err) {
	  console.error(err)
	  res.sendStatus(500);
	}
  })

  app.put(('/changeColor/:id/:color'), async (req, res) => {
	try {
	  const { id, color } = req.params
	  await pool.query('UPDATE bags SET color = $1 WHERE id = $2', [color, id])
	  res.sendStatus(200);
	} catch (err) {
	  console.error(err)
	  res.sendStatus(500);
	}
  })

  app.put(('/changeItemTitle/:id/:new_title'), async (req, res) => {
	try {
	  let { id, new_title } = req.params
	  new_title = new_title === 'null' ? null : new_title;
	  await pool.query('UPDATE items SET title = $1 WHERE id = $2', [new_title, id])
	  res.sendStatus(200);
	} catch (err) {
		console.error(err)
	  res.sendStatus(500);
	}
  })

  app.put(('/changeBagTitle/:id/:new_title'), async (req, res) => {
	try {
	  let { id, new_title } = req.params
	  new_title = new_title === 'null' ? null : new_title;
	  await pool.query('UPDATE bags SET title = $1 WHERE id = $2', [new_title, id])
	  res.sendStatus(200);
	} catch (err) {
		console.error(err)
	  res.sendStatus(500);
	}
  })

  app.put(('/changeBag/:item_id/:bag_id'), async (req, res) => {
	try {
	  const { item_id, bag_id } = req.params
	  await pool.query('UPDATE items SET bag_id = $1 WHERE id = $2', [bag_id, item_id])
	  res.sendStatus(200);
	} catch (err) {
	  console.error(err)
	  res.sendStatus(500);
	}
  })

app.get(('/getBagFromId/:id'), async (req, res) => {
	try {
	  const { id } = req.params
	  const bags = await pool.query('SELECT * FROM bags WHERE id = $1', [id])
	  res.json(bags.rows)
	} catch (err) {
	  console.error(err)
	}
  })

  app.get(('/getItemsFromBag/:id'), async (req, res) => {
	try {
	  const { id } = req.params
	  const items = await pool.query('SELECT * FROM items WHERE bag_id = $1', [id])
	  res.json(items.rows)
	} catch (err) {
	  console.error(err)
	}
  })

app.get(('/:id/bags'), async (req, res) => {
	try {
	  const { id } = req.params
	  const bags = await pool.query(`SELECT * FROM bags 
	  								WHERE trip_id = $1
									ORDER BY bags.id ASC`, [id])
	  res.json(bags.rows)
	} catch (err) {
	  console.error(err)
	}
  })

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))