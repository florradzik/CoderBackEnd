const express = require("express")
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

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Server http on ${PORT}...`)
})

app.get("/", (request, response) => {
  response.send({ msn: "Hola Flor" })
})

app.get("/productos", (request, response) => {
  response.send(container.getAll())
})

app.get("/productoRandom", (request, response) => {
  response.send(container.getByRandom())
})

server.on("error", (error) => console.log("Error on server", error))
