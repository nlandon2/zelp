CREATE TABLE business(
    business_id varchar(1000) PRIMARY KEY, 
    name varchar(1000), 
	neighborhood varchar(1000),
	address varchar(1000),
	city varchar(1000),
	state varchar(1000),
	postal_code varchar(1000),
	latitude float,
	longitude float,
	stars float,
	review_count int,
	is_open bit,
	attributes varchar(1000), 
	categories varchar(1000)
);

COPY business(business_id, name, city, state, stars, is_open, categories) 
FROM '/Users/nlandon/CC/cc10-yelp/yelp_dataset/yelp_business.csv' DELIMITER ',' CSV HEADER;
