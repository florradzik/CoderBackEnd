require("dotenv").config()

module.exports = {
  db: {
    name: process.env.DB_NAME,
    collection: process.env.DB_COLLECTION,
    connectString: "mongodb://127.0.0.1/",
    projection: { __v: 0 },
  },
}

module.exports = Config
