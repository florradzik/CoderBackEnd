const express = require("express")

const app = express()

const personas = []

app.set("views", "./views")
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("desafio2/index", { personas })
})

app.post("/personas", (req, res) => {
  personas.push(req.body)
  console.log(req.body, "added to personas")
  res.render("desafio2/index", { personas })
})

app.listen(8080)

console.log("Running...")
