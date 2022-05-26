const express = require("express")
const multer = require("multer")

const { Router } = express
const app = express()

const DB = []

app.use("/static", express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    const t = Date.now()
    cb(null, t + "-" + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single(filename), (req, res, next) => {
  res.send("Hola Flor")
})

app.listen(8080)
