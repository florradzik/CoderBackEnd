const User = require("../models/User.model")
const log4js = require("log4js")
const logger = log4js.getLogger("info")

const getRegister = async (ctx) => {
  logger.info(`${ctx.request.method}: ${ctx.request.url}`)
  return res.render("register")
}

const postRegister = async (ctx) => {
  logger.info(`${ctx.request.method}: ${ctx.request.url}`)
  return res.redirect("/auth/login")
}

const getLogin = (ctx) => {
  logger.info(`${ctx.request.method}: ${ctx.request.url}`)
  return res.render("login")
}

const postLogin = (ctx) => {
  logger.info(`${ctx.request.method}: ${ctx.request.url}`)
  return res.redirect("/")
}

const logout = (ctx) => {
  logger.info(`${ctx.request.method}: ${ctx.request.url}`)
  const username = ctx.request.session.username
  ctx.request.session.destroy((err) => {
    if (!err) res.render("logout", { username: username })
    else res.send({ status: "Logout ERROR ", body: err })
  })
}

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout,
}
