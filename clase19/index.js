import mongoose from "mongoose"
import * as model from "./models/user.js"

CRUD()

async function CRUD() {
  try {
    const URL = "mongodb://localhost:27017/clasemongoose"
    const rta = mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("DB conectada!")

    console.log("Create")
    const user = {
      name: "Fernando",
      lastname: "Radzik",
      email: "fernandor@icloud.com",
      password: "1234",
    }
    const userSaveModel = new model.UserModel(user)
    const userSave = await userSaveModel.save()
    console.log(userSave)

    //read
    console.log("Read")
    const users = await model.UserModel.find({})
    console.log(users)

    //update
    const userUpdate = await model.UserModel.updateOne(
      { name: "Fernando" },
      { $set: { password: 123 } }
    )
    console.log(userUpdate)
    //delete
    const userDelete = await model.UserModel.deleteOne({ name: "Fernando" })
    console.log(userDelete)
  } catch (e) {
    console.log(e)
  }
}
