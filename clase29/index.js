const cluster = require("cluster")
const { log } = require("console")
const http = require("http")

const numCPUS = require("os").cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  for (let index = 0; index < numCPUS; index++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end("Hello Everybody")
    })
    .listen(8080)

  console.log(`Worker ${process.pid} started`)
}
