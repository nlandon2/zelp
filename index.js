const config = require("./config");
const services = require("./services")(config);
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
let data = models.restaurants;

app.use(morgan("dev"));

const schema = buildSchema(`

  input RestaurantInput {
    business_id: String
    name: String
    city: String
    state: String
    stars: Float
    categories: String
  }
  
  type Restaurant {
    business_id: String
    name: String
    address: String
    city: String
    state: String 
    stars: Float
    categories: String
  }

  type Query {
    Restaurants: [Restaurant]
    Restaurant(business_id: String): Restaurant
    GetEverything(name: String city: String stars: Float categories: String ): [Restaurant]
    GetRandom(city: String name: String stars: Float categories: String ): Restaurant
  }

  type Mutation {
    CreateRestaurant(input: RestaurantInput!): [Restaurant]
    UpdateRestaurant(business_id: String input: RestaurantInput!): [Restaurant]
    DeleteRestaurant(business_id: String): [Restaurant]
  }
`);

const root = {
  Restaurants: () => {
    return data.list();
  },
  Restaurant: async request => {
    const restaurantData = await data.list();
    if (request.business_id)
      return restaurantData.find(
        restaurant => restaurant.business_id === request.business_id
      );
  },
  GetEverything: async request => {
    if (request.name) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.name.indexOf(request.name) !== -1;
      });
    }
    if (request.stars) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.stars >= request.stars;
      });
    }
    if (request.city) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.city.indexOf(request.city) !== -1;
      });
    }
    if (request.categories) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.categories.indexOf(request.categories) !== -1;
      });
    }
    return restaurantData;
  },
  GetRandom: async request => {
    let restaurantData = await data.list();
    if (request.name) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.name.indexOf(request.name) !== -1;
      });
    }
    if (request.stars) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.stars >= request.stars;
      });
    }
    if (request.city) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.city.indexOf(request.city) !== -1;
      });
    }
    if (request.categories) {
      restaurantData = restaurantData.filter(restaurant => {
        return restaurant.categories.indexOf(request.categories) !== -1;
      });
    }
    return restaurantData[Math.floor(Math.random() * restaurantData.length)];
  },
  CreateRestaurant: async request => {
    const addedRestaurant = {};
    for (const key in request.input) {
      addedRestaurant[key] = request.input[key];
    }
    let restaurantData = await data.list();
    restaurantData.push(addedRestaurant);
    restaurantData = data.create(addedRestaurant);
    return restaurantData;
  },
  UpdateRestaurant: async request => {
    let restaurantData = await data.list();
    const foundRestaurant = restaurantData.find(
      restaurant => restaurant.business_id === request.business_id
    );
    for (const key in request.input) {
      foundRestaurant[key] = request.input[key];
    }
    restaurantData = await data.update(foundRestaurant);
    return restaurantData;
  },
  DeleteRestaurant: async request => {
    let restaurantData = await data.list();
    restaurantData = data.delete(request.business_id);
    return restaurantData;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

app.use(express.static(`${__dirname}/public`));

app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }

  services.logger.log(err);
  return res.status(500).send("Internal Error.");
});

app.listen(config.express.port, () => {
  services.logger.log(
    `Server up and listening on port ${config.express.port}/graphql`
  );
});

module.exports = { schema, express };
