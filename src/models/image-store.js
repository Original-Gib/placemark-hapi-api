// importing dependencies

import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

// accessing the cloudinary credentials from the .env file
const credentials = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
};
cloudinary.config(credentials);

export const imageStore = {
  // method to retrieve all images from cloudinary
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  // method to upload image to cloudinary
  uploadImage: async function (imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  // method to delete an image from cloudinary
  deleteImage: async function (img) {
    await cloudinary.v2.uploader.destroy(img, {});
  },
};
