const http = require("http")

const server = http.createServer((request, response) => {
  const date = new Date()
  response.end("Hola, es: " + date.toLocaleTimeString())
})

const connectedServer = server.listen(8080, () => {
  console.log(`SErver http listening on ${connectedServer.address().port} ...`)
})
