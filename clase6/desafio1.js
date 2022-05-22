const { response } = require("express")
const express = require("express")

const app = express()

const server = app.listen(8080)

app.get("/", (request, response) => {
  response.send(
    "<h1 style='color: blue;'>Bienvenidos a la super clase de servidores</h1>"
  )
})
let count = 0
app.get("/visitas", (request, response) => {
  count++
  response.send("La cantidad de visitas es: " + count)
})

app.get("/fyh", (request, response) => {
  let fyh = new Date()
  response.send({ fyh: fyh.toLocaleString() })
})
