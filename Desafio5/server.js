const express = require("express")
const { Router } = express
const app = express()
const router = Router()
const productos = []

app.set("views", "./views")
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Espacio donde se encuentra el formulario
app.get("/", (req, res) => {
  res.render("index")
})

// Espacio donde se encuentran todos los productos
router.post("/", (req, res) => {
  productos.push(req.body)
  console.log(req.body, "added to productos")
  res.render("table", { productos })
})

router.get("/", (req, res) => {
  res.render("table", { productos })
})

app.use("/api/products", router)

app.listen(8080)

console.log("Running...")
