const express = require("express")

const app = express()
app.set("views", "./views")
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  const pets = [
    { name: "Cleopatra", animal: "cat", months: 30 },
    { name: "Maria Antonieta", animal: "cat", months: 10 },
    { name: "Dorado", animal: "fish", months: 12 },
  ]

  const mensaje = "Mascotas de la clase"

  res.render("pets.ejs", { pets, mensaje })
})

app.listen(8080)
