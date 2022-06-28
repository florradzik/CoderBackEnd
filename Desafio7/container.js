class Contenedor {
  constructor(options, table) {
    this.table = table
    this.dbOptions = options
  }

  read() {
    // seleccionar todo
    fs.promises
      .readFile(this.filename)
      .then((data) => {
        this.data = JSON.parse(data)
        console.log("Data loaded!")
      })
      .catch((e) => console.log(e))
  }

  save(obj) {
    // insertar
    const knex = require("knex")(this.dbOptions)
    knex(this.table)
      .insert(obj)
      .then(() => console.log("data inserted"))
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }

  getByID(id) {
    //select
    const knex = require("knex")(this.dbOptions)
    knex
      .from(this.table)
      .select("*")
      .where("id", "=", id)
      .then((rows) => {
        return rows
      })
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }

  getAll() {
    const knex = require("knex")(this.dbOptions)
    knex
      .from(this.table)
      .select("*")
      .then((rows) => {
        return rows
      })
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }

  deleteById(id) {
    const knex = require("knex")(options)
    knex
      .from(this.table)
      .where("age", "=", id)
      .del()
      .then(() => console.log("data deleted"))
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }

  deleteAll() {
    const knex = require("knex")(options)
    knex
      .from(this.table)
      .del()
      .then(() => console.log("data deleted"))
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }
}

module.exports = Contenedor
