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

  getLastID() {
    const l = this.data.length

    if (l < 1) return 0

    return this.data[this.data.length - 1].id
  }

  save(obj) {
    // insertar
    const id = this.getLastID()
    this.data.push({
      ...obj,
      ...{ id: id + 1 },
    })
    this.write()
  }

  getByID(id) {
    //select
    return this.data.find((p) => p.id == id)
  }

  getAll() {
    return this.data
  }

  deleteById(id) {
    const idx = this.data.findIndex((p) => p.id == id)
    this.data.splice(idx, 1)
    this.write()
  }

  deleteAll() {
    this.data = []
    this.write()
  }
}

module.exports = Contenedor
