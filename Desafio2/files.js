const fs = require("fs")
class Contenedor {
  constructor(name) {
    this.name = name
    this.productos = []
  }

  save(obj) {
    obj = { ...obj, id: this.productos.length + 1 }
    this.productos.push(obj)
    if (this.productos.length == 1) {
      fs.promises
        .writeFile(this.name)
        .then((content) => {
          return obj.id
        })
        .catch((error) => console.log(`Unable to add to file, error: ${error}`))
    } else {
      fs.promises
        .appendFile(this.name, obj)
        .then((content) => {
          return obj.id
        })
        .catch((error) => console.log(`Unable to add to file, error: ${error}`))
    }
  }

  getAll() {
    return this.productos
  }

  getById(id) {
    try {
      const obj = productos.find((obj) => obj.id == id)
      return obj
    } catch (error) {
      console.log(`Unable to find object with id : ${id}, error : ${error}`)
    }
  }

  deleteById(id) {
    productos = productos.filter((obj) => obj.id != id)
    fs.promises
      .writeFile(this.name)
      .then((content) =>
        console.log(`Object with id : ${id} was deleted from file`)
      )
      .catch((error) =>
        console.log(`Unable to delete from file, error: ${error}`)
      )
  }

  deleteAll() {
    fs.promises
      .truncate(this.name, 0)
      .then((content) => {
        console.log("All elements from this file where deleted")
        productos = []
      })
      .catch((error) =>
        console.log(
          `The following error ocurred while trying to delete all: ${error}`
        )
      )
  }
}
