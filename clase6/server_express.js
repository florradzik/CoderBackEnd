const { response } = require("express")
const express = require("express")

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Server http on ${PORT}...`)
})

app.get("/", (request, response) => {
  response.send({ msn: "Hola Flor" })
})

app.get("/products", (request, response) => {
  response.send([
    { name: "beer", price: 120 },
    { name: "wine", price: 200 },
  ])
})

server.on("error", (error) => console.log("Error on server", error))
