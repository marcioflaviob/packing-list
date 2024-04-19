
CREATE TABLE trips (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	pin INT,
	last_modification TIMESTAMP NOT NULL
);

CREATE TABLE bags (
	id SERIAL PRIMARY KEY,
	title VARCHAR(40),
	color INT NOT NULL,
	trip_id VARCHAR(255) NOT NULL,
	FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	title VARCHAR(40),
	bag_id INT NOT NULL,
	is_checked BOOLEAN NOT NULL,
	creation_date TIMESTAMP NOT NULL,
	FOREIGN KEY (bag_id) REFERENCES bags(id)
);

-- Inserting data into the trips table
INSERT INTO trips (id, pin, last_modification) VALUES 
('cold-human', 1234, CURRENT_TIMESTAMP),
('rice-tree', 5678, CURRENT_TIMESTAMP);

-- Inserting data into the bags table
INSERT INTO bags (title, color, trip_id) VALUES 
('Backpack', 1, 'cold-human'),
('Big suitcase', 2, 'cold-human'),
('Me', 3, 'cold-human'),
('Shoulder bag', 1, 'rice-tree'),
('Me', 2, 'rice-tree');

-- Inserting data into the items table
INSERT INTO items (title, bag_id, is_checked, creation_date) VALUES 
('Travel documents', 1, FALSE, CURRENT_TIMESTAMP),
('Laptop', 1, TRUE, CURRENT_TIMESTAMP),
('Black coat', 2, FALSE, CURRENT_TIMESTAMP),
('Suit and tie', 2, TRUE, CURRENT_TIMESTAMP),
('Passport', 3, FALSE, CURRENT_TIMESTAMP),
('Smartphone', 4, FALSE, CURRENT_TIMESTAMP),
('Smartphone', 3, FALSE, CURRENT_TIMESTAMP),
('Keys', 3, FALSE, CURRENT_TIMESTAMP);
