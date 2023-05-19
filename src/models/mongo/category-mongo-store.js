// importing dependencies

import { Category } from "./category.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const categoryMongoStore = {
  // method to retrieve all categories
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  // method to retrieve categories by category ID
  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarks = await placemarkMongoStore.getPlacemarksByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  // method to add a category
  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  // method to retrieve all categories for a user
  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  // method to delete a category by ID
  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all categories
  async deleteAllCategories() {
    await Category.deleteMany({});
  },
};
