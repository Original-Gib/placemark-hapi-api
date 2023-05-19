// importing dependencies

import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
  // index method for loading the placemark view page
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const viewData = {
        title: "Placemark",
        category: category,
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  // method to upload an image against a placemark
  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/category/${category._id}/viewplacemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        const category = await db.categoryStore.getCategoryById(request.params.id);
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
        return h.redirect(`/category/${category._id}/viewplacemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  // method to update the placemark
  update: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const newPlacemark = {
        placemarkName: request.payload.placemarkName,
        description: request.payload.description,
        lcoation: request.payload.location,
      };
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placemarkStore.updatePlacemarkDetails(newPlacemark);
      return h.redirect(`/category/${category._id}/viewplacemark/${placemark._id}`);
    },
  },
};
