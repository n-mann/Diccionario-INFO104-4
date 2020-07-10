// Este scripts es únicamente para automatizar
// la creación de la base de datos por primera vez
(async () => {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
  const config = require("../../knexfile").development;
  const database = config.connection.database;
  config.connection.database = null;
  const knex = require("knex")(config);

  await knex.raw(`CREATE DATABASE IF NOT EXISTS ${database}`);
  await knex.destroy();
})();
