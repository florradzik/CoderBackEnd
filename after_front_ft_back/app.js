const express = require("express")

const cartRouter = require("./router/cart_router")
const productRouter = require("./router/product_router")

const app = express()

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(8080)
