const { Sequelize } = require("sequelize")
const { DB_HOST, DB_USERNAME, DB_PW, DB_NAME, DB_TABLE } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PW, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
})

module.exports = sequelize
