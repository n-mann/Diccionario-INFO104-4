const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
  createEnvFileIfNotExists();
}
dotenv.config();

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

module.exports = {
  development: {
    client: "mysql",
    connection,
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "mysql",
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

async function createEnvFileIfNotExists() {
  const dotEnvLocation = path.resolve(process.cwd(), ".env");
  const envFileExists = fs.existsSync(dotEnvLocation);

  if (!envFileExists) {
    fs.writeFileSync(
      dotEnvLocation,
      `
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
DB_DATABASE=ores_react
    `.trim(),
      {
        encoding: "utf-8",
      }
    );
  }
}
