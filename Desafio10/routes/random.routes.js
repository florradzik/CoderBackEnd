const router = require("express").Router()
const { fork } = require("child_process")

router.get("/", (req, res) => {
  const { cant = Math.pow(10, 8) } = req.query
  const child = fork("./randoms.js", [Number(cant)])
  child.send(cant)
  child.on("message", (numbers) => {
    return res.json({ numbers })
  })
})

module.exports = router
