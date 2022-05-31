const express = require("express")
const { engine } = require("express-handlebars")

const app = express()

const fakeApi = () => [
  { name: "Beers", price: 120 },
  { name: "Wine", price: 120 },
  { name: "Ron", price: 120 },
  { name: "Fernet", price: 120 },
]

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
)

app.set("view engine", "hbs") //le decimos que motor usamos. Ponemos la extension
app.set("views", "./views") // ponemos la carpeta donde van a estar las vistas

app.get("/", (req, res) => {
  res.send("OK")
})

app.get("/template", (req, res) => {
  res.render("main", {
    products: fakeApi(),
    listExists: true,
  })
})
app.listen(8080)
