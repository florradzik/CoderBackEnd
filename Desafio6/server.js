const express = require("express")
const http = require("http")
const { DateTime } = require("luxon")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(httpServer)
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.set("views", "./views")
app.set("view engine", "ejs")

const products = []
const messages = []

const fileProducts = "products.json"
const fileMessages = "messages.json"

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  console.log(req.body)
  products.push(req.body)
  res.json(req.body)
})

app.get("/products", (req, res) => {
  res.render("products", { products })
})

app.get("/messages", (req, res) => {
  res.render("messages", { messages })
})

io.on("connection", (socket) => {
  socket.on("add", (data) => {
    console.log(data)
    products.push(data)
    io.socket.emit("show", products)
  })

  socket.on("chat-in", (data) => {
    const dateString = new Date.toLocaleString()
    const dataOut = {
      msn: data.msn,
      username: data.username,
      date: dateString,
    }
    console.log(dataOut)
    contenedorMessages.save(dataOut)
    io.sockets.emit("chat-out", "ok")
  })
})
app.use("/public")

server.listen(8080, () => console.log("Running"))
