
COPY restaurants(business_id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open, categories) 
FROM '/Users/nlandon/CC/cc10-yelp/yelp_dataset/yelp_business.csv' DELIMITER ',' CSV HEADER
WHERE is_open = 1
AND(strpos(categories, 'Food') > 0
OR strpos(categories, 'Restaurants') > 0);
