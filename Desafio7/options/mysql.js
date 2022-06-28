const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "secret",
    database: "mibase",
  },
}

const knex = require("knex")(options)
knex.schema
  .createTable("products", (table) => {
    table.increments("id", { primaryKey: true })
    table.integer("price")
    table.string("item")
  })
  .then(() => console.log("table created"))
  .catch((err) => {
    console.log(err)
    throw err
  })
  .finally(() => knex.destroy())

module.exports = options
