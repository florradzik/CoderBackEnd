const Contenedor = require("./files.js")

const container = new Contenedor("file.json")

container.save({
  title: "Buzo",
  price: 400.56,
  thumbnail:
    "https://vivasmoda.com.ar/productos/buzo-national-friza/?variant=466808371",
})

container.save({
  title: "Remera",
  price: 40.56,
  thumbnail:
    "https://vivasmoda.com.ar/productos/remera-media-polera-m-l/?variant=465981160",
})

container.save({
  title: "Remera",
  price: 40.56,
  thumbnail:
    "https://vivasmoda.com.ar/productos/remera-media-polera-m-l/?variant=465981160",
})

container.save({
  title: "Remera",
  price: 40.56,
  thumbnail:
    "https://vivasmoda.com.ar/productos/remera-media-polera-m-l/?variant=465981160",
})

console.log(container.getByID(4))
console.log(container.deleteById(2))
console.log(container.getAll())
