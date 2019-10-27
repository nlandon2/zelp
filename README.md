# Zelp

This was created during my time as a student at Code Chrysalis. API based off of the Yelp academic dataset that finds open restaurants in 12 major cities in the US and Canada by their names, city, number of stars, and what kind of food they serve. There is also a feature that gets a random restaurant for people who cannot decide where to eat.


### Prerequisites
```
yarn 
```
To install software in package.json, including knex, express, and graphql.

```
yarn start
```
starts the server at localhost:3000

```
yarn dev
``` 
starts the server at localhost:3000, and resets everytime main index file is saved

```
yarn run migrate
``` 
runs migration file

```
yarn run rollback
``` 
goes back a migration file

```
yarn test
``` 
runs test file


## Endpoints
GraphQL is used with `localhost:3000/graphql` as a post query to gather data. Preset data from the dataset can be obtained with the yelp.sql file in the dataset folder.
```
Restaurants
```
Query that gets data of every restaurant

```
Restaurant(business_id: String)
```
Query that gets a restaurant by id

```
GetEverything(name: String city: String stars: Float categories: String)
``` 
Query that gets data of every restaurant that can be filtered by name, city, number of stars on Yelp, and what kind of food is served

```
GetRandom(city: String name: String stars: Float categories: String )
``` 
Query that takes a random restaurant after filtering with at most these 4 types, similar to "I'm Feeling Lucky" from Google (for people who can't decide)

```
CreateRestaurant(input: RestaurantInput!)
``` 
Mutation that creates a new restaurant

```
UpdateRestaurant(business_id: String input: RestaurantInput)
``` 
Mutation that looks for a restaurant by id and then edits it

```
Delete Restaurant(business_id: String)
``` 
Mutation that looks for a restaurant by id and then deletes it


## Acknowledgments

* Used the Yelp academic dataset

