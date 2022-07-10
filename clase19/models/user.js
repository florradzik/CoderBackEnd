import mongoose from "mongoose"

const userCollection = "users"

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 100 },
  lastname: { type: String, require: true, max: 100 },
  email: { type: String, require: true, max: 100 },
  username: { type: String, require: true, max: 100 },
  password: { type: Number, require: true },
})

export const UserModel = mongoose.model(userCollection, UserSchema)
