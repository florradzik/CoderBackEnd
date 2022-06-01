const express = require("express")
const router = express.Router()

const DB = []
const app = express()

app.use("/static", express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("server OK")
})

router.get("/", (req, res) => {
  res.json(DB)
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const obj = DB.find((d) => d.id === id)
  if (obj == undefined) {
    res.send({ error: "Producto no encontrado" })
  } else {
    res.json(obj)
  }
})

router.post("/", (req, res) => {
  const id = getLastID()
  DB.push({
    ...req.body,
    ...{ id: id + 1 },
  })
  res.send("Object pushed")
})

const getLastID = () => {
  const l = DB.length

  if (l < 1) return 0

  return DB[DB.length - 1].id
}

router.put("/:id", (req, res) => {
  const id = req.params.id
  objIndex = DB.findIndex((obj) => obj.id === id)
  DB[objIndex] = req.body
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  const idx = DB.findIndex((p) => p.id === id)
  DB.splice(idx, 1)
})

app.use("/api/products", router)

app.listen(8080)
