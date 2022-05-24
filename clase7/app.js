const express = require("express")

const app = express()

const data = [
  { msg: "Saludos", name: "Flor" },
  { msg: "Chau", name: "Jose" },
]

app.get("/", (req, res) => {
  res.send("OK")
})

app.get("/api/mensajes", (req, res) => {
  if (Object.entries(req.query).length > 0) {
    res.json(data.filter((d) => d.name == req.query.name))
  } else {
    res.json(data)
  }
})

app.get("/api/mensajes/:id", (req, res) => {
  const id = req.params.id
  res.json(data.find((d) => d.id == id))
})

app.listen(8080)
