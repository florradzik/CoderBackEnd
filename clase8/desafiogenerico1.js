const express = require("express")

const app = express()

const DB = []

app.use("/static", express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { Router } = express
const router = Router()

router.get("/", (req, res) => {
  res.json(DB)
})

router.post("/", (req, res) => {
  DB.push(req.body)
  res.send("Person saved")
})

app.use("/api/person", router)

app.listen(8080)
