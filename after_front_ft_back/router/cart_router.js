const express = require("express")

const { Router } = express

const cartRouter = Router()

cartRouter.get("/", (req, res) => res.send("OK"))

module.exports = cartRouter
