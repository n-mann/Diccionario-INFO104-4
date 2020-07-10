const Knex = require("knex");
const oresData = require("./oresData.json");

/**
 * @param knex {Knex}
 */
exports.up = async function (knex) {
  await knex.schema.createTable("courses", (t) => {
    t.increments("id").primary().notNullable();
    t.string("code").notNullable();
    t.string("name").notNullable();
    t.integer("weekhours").notNullable();
  });

  await knex("courses").insert(oresData);

  await knex.schema.createTable("subscriptions", (t) => {
    t.string("email").unique().primary();
    t.timestamps(true, true);
  });
};

/**
 * @param knex {Knex}
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("courses");
  await knex.schema.dropTableIfExists("subscriptions");
};
