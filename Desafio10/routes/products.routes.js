const router = require("express").Router()
const log4js = require("log4js")
const {
  createProductsTable,
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller")

const validateUser = require("../middlewares/validate-user")

//helpers:
const toCamel = require("../helpers/camel-case")

//Rutas:
//INDEX:
router.get("/", validateUser, (req, res) => {
  const logger = log4js.getLogger("info")
  logger.info(`${req.method}: ${req.url}`)
  let { username } = req.session.passport.user
  username = toCamel(username)
  res.render("index", { mesage: "", username })
})

//CRUD PRODUCTS:
router.get("/products", validateUser, getAllProducts)

router.get("/products/:id", validateUser, getProductById)

router.post("/products", validateUser, newProduct)

router.put("/products/:id", validateUser, updateProduct)

router.delete("/products/:id", validateUser, deleteProduct)

module.exports = router
