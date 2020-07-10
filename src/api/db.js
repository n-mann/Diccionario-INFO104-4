import knex from "knex";
import * as knexfile from "../../knexfile";

export const db = knex(knexfile[process.env.NODE_ENV]);

// Cambiar "remake" a "true" para borrar las tablas y crearlas denuevo.
// Util cuando se hacen modificaciones en las tablas.
const remake = false;
if (remake && process.env.NODE_ENV === "development") {
  db.migrate
    .down()
    .then(() => {
      console.warn("| ¡Tablas reiniciadas! |");
    })
    .catch(console.error)
    .finally(() => {
      db.migrate.latest().catch(console.error);
    });
} else {
  db.migrate.latest().catch(console.error);
}
