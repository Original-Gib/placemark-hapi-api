import Mongoose from "mongoose";

const { Schema } = Mongoose;

// setting the user object schema for mongo db
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);
