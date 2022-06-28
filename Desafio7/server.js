const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const Contenedor = require("./contenedor")
const app = express()
const server = http.createServer(app)
const io = new Server(httpServer)
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.set("views", "./views")
app.set("view engine", "ejs")
const optionsProducts = require("./options/mysql")
const optionsMessages = require("./options/SQLite")

contenedorProductos = new Contenedor(optionsProducts)
contenedorMessages = new Contenedor(optionsMessages)

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  console.log(req.body)
  contenedorProductos.save(data)
  res.json(req.body)
})

app.get("/products", (req, res) => {
  res.render("products", { products: contenedorProductos.getAll() })
})

app.get("/messages", (req, res) => {
  res.render("messages", { messages: contenedorMessages.getAll() })
})

io.on("connection", (socket) => {
  socket.on("add", (data) => {
    console.log(data)
    contenedorProductos.save(data)
    io.socket.emit("show", { products: contenedorProductos.getAll() })
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
