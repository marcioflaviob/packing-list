
DROP TABLE items;
DROP TABLE bags;
DROP TABLE trips;

CREATE TABLE trips (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	pin VARCHAR(255),
	last_modification TIMESTAMP NOT NULL
);

CREATE TABLE bags (
	id SERIAL PRIMARY KEY,
	title VARCHAR(40),
	color INT NOT NULL,
	trip_id VARCHAR(255) NOT NULL,
	creation_date TIMESTAMP NOT NULL,
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
INSERT INTO trips (id, last_modification) VALUES 
('cold-human', CURRENT_TIMESTAMP),
('rice-tree', CURRENT_TIMESTAMP);

-- Inserting data into the bags table
INSERT INTO bags (title, color, trip_id, creation_date) VALUES 
('Backpack', 1, 'cold-human', CURRENT_TIMESTAMP),
('Big suitcase', 2, 'cold-human', CURRENT_TIMESTAMP),
('Me', 3, 'cold-human', CURRENT_TIMESTAMP),
('Shoulder bag', 1, 'rice-tree', CURRENT_TIMESTAMP),
('Me', 2, 'rice-tree', CURRENT_TIMESTAMP);

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
