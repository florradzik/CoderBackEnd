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
        .writeFile(this.name, JSON.stringify(obj, null, "\t"))
        .then((content) => {
          return obj.id
        })
        .catch((error) => console.log(`Unable to add to file, error: ${error}`))
    } else {
      fs.promises
        .appendFile(this.name, JSON.stringify(obj, null, "\t"))
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
      const obj = this.productos.find((obj) => obj.id == id)
      return obj
    } catch (error) {
      console.log(`Unable to find object with id : ${id}, error : ${error}`)
    }
  }

  deleteById(id) {
    this.productos = this.productos.filter((obj) => obj.id != id)
    fs.promises
      .writeFile(this.name, JSON.stringify(this.productos, null, "\t"))
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
        this.productos = []
      })
      .catch((error) =>
        console.log(
          `The following error ocurred while trying to delete all: ${error}`
        )
      )
  }
}

file = new Contenedor("./productos.txt")

file.save({
  title: "Buzo",
  price: 400.56,
  thumbnail:
    "https://vivasmoda.com.ar/productos/buzo-national-friza/?variant=466808371",
})

file.save({
  title: "Remera",
  price: 40.56,
  thumbnail:
    "https://vivasmoda.com.ar/productos/remera-media-polera-m-l/?variant=465981160",
})
console.log(file.getById(1))
file.deleteById(1)
console.log(file.getAll())
file.deleteAll()
