const express = require("express")
const fs = require("fs")

const app = express()

app.engine("ntl", function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err))
    }

    const rendered = content
      .toString()
      .replace("#title#", "<h1>" + options.title + "</h1>")
      .replace("#message#", "<p>", +options.message + "</p>")

    return callback(null, rendered)
  })
})

app.set("views", "./views") // LA carpeta
app.set("view engine", "ntl") //

app.get("/", (req, res) => {
  res.send("OK")
})

app.get("/template", (req, res) => {
  res.render("index", {
    title: "Hola Agustin!!",
    message: "Informacion de plantilla",
  })
})

app.listen(8080)
