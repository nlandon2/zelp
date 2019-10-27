/* eslint-disable no-console */
const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("restaurants", () => {
  describe("setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () =>
      knex("restaurants")
        .select()
        .catch(() => assert.fail("users table is not found.")));
  });

  describe("#create", () => {
    let params = { name: "" };

    context("when bad params are given", () => {
      before(() => {
        params = { name: " " };
      });

      it("politely refuses", () =>
        models.restaurants
          .create(params)
          .then(forcePromiseReject)
          .catch(err =>
            expect(err.message).to.equal(
              "Name must be provided, and be at least two characters"
            )
          ));
    });

    context("when good params are given", () => {
      before(() => {
        params.business_id = "1";
        params.name = "Hello";
      });

      afterEach(() => knex("restaurants").del()); // delete all users after each spec

      it("creates a restaurant", () =>
        models.restaurants.create(params).then(restaurant => {
          expect(restaurant[0]).to.include({ name: params.name });
          expect(restaurant[0].business_id).to.be.a("string");
        }));
    });
  });

  describe("#list", () => {
    const restaurantNames = ["Hello", "World"];
    const restaurants = restaurantNames.map(name => ({
      name
    }));
    restaurants[0].business_id = "1";
    restaurants[1].business_id = "2";
    before(() => Promise.all(restaurants.map(models.restaurants.create)));
    after(() => knex("restaurants").del());

    it("lists all restaurants", () =>
      models.restaurants.list().then(resp => {
        expect(resp[0].name).to.deep.equal(restaurants[0].name);
        expect(resp[1].name).to.deep.equal(restaurants[1].name);
      }));
  });

  describe("#update", () => {
    const restaurantNames = ["Hello", "World"];
    const restaurants = restaurantNames.map(name => ({
      name
    }));
    restaurants[0].business_id = "1";
    restaurants[1].business_id = "2";
    before(() => Promise.all(restaurants.map(models.restaurants.create)));
    after(() => knex("restaurants").del());

    it("updates a restaurant", () => {
      restaurants[0].name = "Foo";
      models.restaurants.update(restaurants[0]).then(resp => {
        expect(resp[0].name).to.deep.equal("Foo");
      });
    });
  });

  describe("#delete", () => {
    const restaurantNames = ["Hello", "World"];
    const restaurants = restaurantNames.map(name => ({
      name
    }));
    restaurants[0].business_id = "1";
    restaurants[1].business_id = "2";
    before(() => Promise.all(restaurants.map(models.restaurants.create)));
    after(() => knex("restaurants").del());

    it("deletes a restaurant", () =>
      models.restaurants.delete("2").then(resp => {
        expect(resp[0].name).to.deep.equal(restaurants[0].name);
        expect(resp.length).to.deep.equal(1);
      }));
  });
});
