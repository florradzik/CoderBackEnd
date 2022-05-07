class User {
  constructor(obj = {}) {
    this.nombre = obj?.nombre || ""
    this.apellido = obj?.apellido || ""
    this.mascotas = []
    this.libros = []
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`
  }

  addMascota(name) {
    this.mascotas.push(name)
  }

  countMascotas() {
    return this.mascotas.length
  }

  addBook(name, author) {
    this.libros.push({ nombre: name, autor: author })
  }

  getBookNames() {
    return this.libros.map((libro) => libro.nombre)
  }
}

const user1 = new User({
  nombre: "Florencia",
  apellido: "Radzik",
})

user1.addBook("Milkman", "Anna Burns")
user1.addBook("A Gate at the Stairs", "Lorrie Moore")
user1.addMascota("Cleopatra")
user1.addMascota("Maria Antonieta")
console.log(user1.countMascotas())
console.log(user1.getFullName())
console.log(user1.getBookNames())
