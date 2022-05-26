const express = require("express")
const multer = require("multer")

const { Router } = express
const app = express()

const DB = []

app.use("/static", express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MiddleWare
app.use(function (req, res, next) {
  console.log("Time: ", new Date().toLocaleTimeString())
  next()
})

app.use(function (req, res, next) {
  console.log("Method: ", req.method)
  next()
})

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
  res.json([])
})

router.post("/", (req, res) => {
  DB.push(req.body)
  res.send("obj pushed")
})

router.post(
  "/uploadfile",
  upload.single("myFile", (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error("Please upload file")
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
  })
)

app.use("/api/products", router)

app.listen(8080)
