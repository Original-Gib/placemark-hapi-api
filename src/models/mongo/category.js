// importing dependencies

import Mongoose from "mongoose";

const { Schema } = Mongoose;

// setting the schema for category object in the mongo DB
const categorySchema = new Schema({
  categoryName: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Category = Mongoose.model("Category", categorySchema);
