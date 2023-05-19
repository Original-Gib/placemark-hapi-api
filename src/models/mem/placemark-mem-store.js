import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark._id = v4();
    placemark.categoryid = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    return placemarks.filter((placemark) => placemark.categoryid === id);
  },

  async getPlacemarkById(id) {
    return placemarks.find((placemark) => placemark._id === id);
  },

  async getCategoryPlacemarks(categoryId) {
    return placemarks.filter((placemark) => placemark.categoryid === categoryId);
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.placemarkName = updatedPlacemark.placemarkName;
    placemark.description = updatedPlacemark.description;
  },
};
