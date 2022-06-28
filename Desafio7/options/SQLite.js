const options = {
  client: "sqlite3",
  connection: {
    filename: "./ecommerce/mydb.sqlite",
  },
  useNulllAsDefault: true,
}

const knex = require("knex")(options)
knex.schema
  .createTable("messages", (table) => {
    table.increments("id", { primaryKey: true })
    table.string("user")
    table.string("content")
  })
  .then(() => console.log("table created"))
  .catch((err) => {
    console.log(err)
    throw err
  })
  .finally(() => knex.destroy())

module.exports = options
