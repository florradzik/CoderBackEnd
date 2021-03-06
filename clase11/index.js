const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("./public"))
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname })
})

io.on("connection", (data) => {
  const time = new Date().toLocaleTimeString()
  io.sockets.emit("mensaje", `${time}: ${data}`)
})

server.listen(3000)
