const express = require("express")

const { Router } = express

const productRouter = Router()

const products = []

productRouter.get("/", (req, res) => res.send("OK"))

module.exports = productRouter
