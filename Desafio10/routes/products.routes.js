const router = require("express").Router()
const dbSQL = require("../controllers/ProdsContainer")

const auth = (req, res, next) => {
  if (req.session.username) {
    return next()
  }

  return res.status(401).redirect("/login")
}

router.get("/login", (req, res) => {
  let { username } = req.query

  if (!username) return res.status(401).render("login")

  req.session.username = username
  req.session.admin = true

  res.redirect("/")
})

router.get("/logout", (req, res) => {
  const username = req.session.username
  req.session.destroy((err) => {
    if (!err) res.render("logout", { username: username })
    else res.send({ status: "Logout ERROR ", body: err })
  })
})

router.get("/", auth, (req, res) => {
  req.session.touch() //Script que reinicia el timepo de vida de la session
  console.log(req.session.cookie.maxAge)
  res.render("index", { mesage: "", username: req.session.username })
})

//1) Devuelve todos los productos
router.get("/products", auth, (req, res) => {
  req.session.touch() //Script que reinicia el timepo de vida de la session
  dbSQL
    .getAll()
    .then((products) => res.render("productos", { products: products }))
})

router.get("/products/:id", auth, (req, res) => {
  req.session.touch()
  const id = Number(req.params.id)
  dbSQL.getById(id).then((result) => {
    result.length < 1
      ? res.json({ error: "Producto no encontrado." })
      : res.json(result)
  })
})

router.post("/products", auth, (req, res) => {
  req.session.touch()
  const newProd = req.body
  dbSQL.newProduct(newProd).then(() => res.redirect("/products"))
})

router.put("/products/:id", auth, (req, res) => {
  req.session.touch()
  const id = req.params.id
  const product = req.body

  dbSQL
    .updateProduct(product, id)
    .then(() => res.json({ mesage: "Producto editado" }))
})

router.delete("/products/:id", auth, (req, res) => {
  req.session.touch()
  const id = req.params.id

  dbSQL.deleteProduct(id).then(() => res.json({ mesage: "Producto eliminado" }))
})

module.exports = router
