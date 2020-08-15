const Knex = require("knex");
const oresData = require("./oresData.json");
const hispadicData = require("./hispadic1207.json");
const kanjidicData = require("./kanjidic0208.json");

/**
 * @param knex {Knex}
 */
exports.up = async function (knex) {
  await knex.schema.createTable("hispadic", (t) => {
    t.increments("id").primary().notNullable();
    t.string("japanese").notNullable();
    t.string("reading").notNullable();
    t.string("class").notNullable();
    t.string("spanish", 1000).notNullable();
  });

  await knex("hispadic").insert(hispadicData);

  await knex.schema.createTable("kanjidic", (t) => {
    t.increments("id").primary().notNullable();
    t.string("kanji").notNullable();
    t.integer("grade").notNullable();
    t.integer("strokes").notNullable();
    t.integer("frequency").notNullable();
    t.integer("jlpt").notNullable();
    t.string("on").notNullable();
    t.string("kun").notNullable();
    t.string("english", 500).notNullable();
    t.string("spanish", 500).notNullable();
    t.string("nanori").notNullable();
  });

  await knex("kanjidic").insert(kanjidicData);
};

/**
 * @param knex {Knex}
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("hispadic");

  await knex.schema.dropTableIfExists("kanjidic");
};
