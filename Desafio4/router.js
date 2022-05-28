const express = require("express")
const multer = require("multer")

const { Router } = express
const app = express()

const DB = []

app.use("/static", express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = Router()

router.get("/", (req, res) => {
  res.json(DB)
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  res.json(DB.find((d) => d.id == id))
})

router.post("/", (req, res) => {
  DB.push(req.body)
  res.send("Object pushed")
})

router.put("/:id", (req, res) => {
  const id = req.params.id
  objIndex = DB.findIndex((obj) => obj.id == id)
  DB[objIndex] = req.body
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  DB = DB.map((d) => d.id != id)
})

app.use("/api/products", router)

app.listen(8080)
