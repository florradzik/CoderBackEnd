const express = require("express")
const app = express()

app.get("/", (x, r) => r.send("OK"))
app.listen(8080)
