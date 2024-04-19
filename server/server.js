const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./database')
const cors = require('cors')
const fs = require('fs');

const diceware = fs.readFileSync('diceware.txt', 'utf8').split('\n');

app.use(cors())

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

  app.put(('/changeItemTitle/:id/:new_title'), async (req, res) => {
	try {
	  const { id, new_title } = req.params
	  await pool.query('UPDATE items SET title = $1 WHERE id = $2', [new_title, id])
	  res.sendStatus(200);
	} catch (err) {
		console.error('Error message:', err.message);
		console.error('Stack trace:', err.stack);
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
	  const bags = await pool.query('SELECT * FROM bags WHERE trip_id = $1', [id])
	  res.json(bags.rows)
	} catch (err) {
	  console.error(err)
	}
  })

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))