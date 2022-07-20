const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const Contenedor = require("./container")
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.set("views", "./views")
app.set("view engine", "ejs")

const normalizr = require("normalizr")
const normalize = normalizr.normalize
const schema = normalizr.schema
const util = require("util")

const schemaAuthor = new schema.Entity(
  "author",
  {},
  {
    idAttribute: "mail",
  }
)

const schemaMessages = new schema.Entity(
  "messages",
  {
    author: schemaAuthor,
  },
  {
    idAttribute: "id",
  }
)

const schemaAllMessages = new schema.Entity(
  "allMessages",
  {
    messages: [schemaMessages],
  },
  {
    idAttribute: "id",
  }
)

const messagesJson = new Contenedor("messages.json")
const productsJson = new Contenedor("products.json")

app.get("/", async (request, resolve) => {
  const messages = await messagesJson.getAll()
  resolve.render("index", { messages })
})

app.get("/products", async (request, resolve) => {
  const products = await productsJson.getAll()
  resolve.render("productsList", { products })
})

io.on("connection", async (socket) => {
  //products
  const products = await productsJson.getAll()
  socket.emit("show", products)
  socket.on("add", (data) => {
    productsJson.save(data)
    io.sockets.emit("show", "ok")
  })

  //messages
  const messages = await messagesJson.getAll()
  const normalizedMessages = normalize(messages, schemaAllMessages)
  socket.emit("messages", normalizedMessages)

  function print(obj) {
    console.log(util.inspect(obj, false, 12, true))
  }
  socket.on("new-message", async (data) => {
    messagesJson.save(data)
    const messages = await messagesJson.getAll()
    const messagesId = {
      id: "messages",
      allMessages: [messages],
    }
    const normalizedMessages = normalize(messagesId, schemaAllMessages)
    io.sockets.emit("messages", normalizedMessages)

    print(normalizedMessages)
  })
})
