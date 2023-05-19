// importing dependencies

import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  // method to retrieve all placemarks
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  // method to add a placemark
  async addPlacemark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  // method to retrieve a placemark by category ID
  async getPlacemarksByCategoryId(id) {
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    return placemarks;
  },

  // method to retrieve a placemark by ID
  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  // method to delete a placemark using the ID
  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all placemarks
  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  // method to update a placemark - used to add an image to the placemark
  async updatePlacemark(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemark.placemarkName = updatedPlacemark.placemarkName;
    placemark.description = updatedPlacemark.description;
    placemark.img = updatedPlacemark.img;
    placemark.latitide = updatedPlacemark.latitide;
    placemark.longitude = updatedPlacemark.longitude;
    await placemark.save();
  },

  // method to update a placemark - used to change the placemarks details
  async updatePlacemarkDetails(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemark.placemarkName = updatedPlacemark.placemarkName;
    placemark.description = updatedPlacemark.description;
    placemark.img = updatedPlacemark.img;
    placemark.location = updatedPlacemark.location;
    await placemark.save();
  },
};
