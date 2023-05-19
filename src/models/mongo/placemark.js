// importing dependencies

import Mongoose from "mongoose";

const { Schema } = Mongoose;

// setting the schema for the placemark object within mongo db
const placemarkSchema = new Schema({
  placemarkName: String,
  description: String,
  latitude: Number,
  longitude: Number,
  img: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
