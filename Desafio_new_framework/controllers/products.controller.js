const { logger, loggErrorFile, loggWarningFile } =
  ctx.requestuire("../helpers/logger")

//Models:
const Products = ctx.requestuire("../models/Product.model")
const Users = ctx.requestuire("../db/model.mongo/User.model")

const getAllProducts = async (ctx) => {
  try {
    //Log4js
    logger.info(`${ctx.ctx.requestuest.method}: ${ctx.ctx.requestuest.url}`)

    ctx.ctx.requestuest.session.touch()
    let { username } = ctx.ctx.requestuest.session.passport.user
    const user = await Users.findOne({ username })

    const { type, sort } = ctx.ctx.requestuest.query
    const query = {
      where: { state: 1 },
    }

    if (type) query.where.type = type
    if (sort) query.order = [["price", sort]]

    const products = await Products.findAll(query)
    const count = await Products.count(query)

    return res.render("productos", { products, user, type, count })
    // return res.json({ count, products })
  } catch (error) {
    loggErrorFile.error(
      `${ctx.ctx.requestuest.method}: ${ctx.ctx.requestuest.url} + ${error}`
    )
  }
}

const getProductById = async (ctx) => {
  try {
    //Log4js
    logger.info(`${ctx.request.method}: ${ctx.request.url}`)

    ctx.request.session.touch()
    const { id } = ctx.request.params

    const product = await Products.findByPk(id, {
      where: { state: true },
    })

    if (!product || !product.state) {
      ctx.response.status = 404
      ctx.body = {
        status: "error",
        message: "No se pudo encontrar el producto",
      }
    }

    ctx.response.status = 201
    ctx.body = {
      status: "success",
      message: product,
    }
  } catch (error) {
    loggErrorFile.error(`${ctx.request.method}: ${ctx.request.url} + ${error}`)
  }
}

const newProduct = async (ctx) => {
  try {
    //Log4js
    logger.info(`${ctx.request.method}: ${ctx.request.url}`)

    ctx.request.session.touch()

    const { title, price, desc, img, type } = ctx.request.body
    const newProd = await Products.create({ title, price, desc, img, type })

    return ctx.response.redirect("/products")
    // res.json({ newProd })
  } catch (error) {
    loggErrorFile.error(`${ctx.request.method}: ${ctx.request.url} + ${error}`)
  }
}

const updateProduct = async (ctx) => {
  try {
    //Log4js
    logger.info(`${ctx.request.method}: ${ctx.request.url}`)

    ctx.request.session.touch()
    const { id } = ctx.request.params
    const { title, price, desc, img, type } = ctx.request.body

    const editedProd = await Products.findByPk(id)

    if (!editedProd) {
      {
        ctx.response.status = 404
        ctx.body = {
          status: "error",
          message: `El producto con ID: ${id} no existe.`,
        }
      }
    }

    if (title) editedProd.title = title
    if (price) editedProd.price = price
    if (desc) editedProd.desc = desc
    if (img) editedProd.img = img
    if (type) editedProd.type = type

    await editedProd.save()

    // return res.json({
    //   msg: "Producto actualizado.",
    //   editedProd
    // });
    return ctx.response.redirect("/products")
  } catch (error) {
    loggErrorFile.error(`${ctx.request.method}: ${ctx.request.url} + ${error}`)
  }
}

const deleteProduct = async (ctx) => {
  try {
    //Log4js
    logger.info(`${ctx.request.method}: ${ctx.request.url}`)

    ctx.request.session.touch()
    const { id } = ctx.request.params

    const deletedProd = await Products.findByPk(id)

    if (!deletedProd) {
      ctx.response.status = 404
      ctx.body = {
        status: "error",
        message: `El producto con ID: ${id} no existe.`,
      }
    }

    deletedProd.state = false

    await deletedProd.save()

    // return res.json({
    //   mesage: `Producto con ID: ${id} eliminado.`
    // })
    return ctx.response.redirect("/products")
  } catch (error) {
    loggErrorFile.error(`${ctx.request.method}: ${ctx.request.url} + ${error}`)
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
}
