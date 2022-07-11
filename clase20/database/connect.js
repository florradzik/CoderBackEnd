const mongoose = require("mongoose")

const connectDB = async () => {
  const pass = "root"
  const url = `mongodb+srv://admin:${pass}@coderhouseclass20.9ijfb.mongodb.net/?retryWrites=true&w=majority`

  await mongoose.connect(url)
}

module.exports = connectDB
