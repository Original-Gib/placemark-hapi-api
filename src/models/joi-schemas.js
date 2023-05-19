import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// a spec setting the expected fields for a users login
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").regex(/^[a-zA-Z0-9'@£$%^&*()? ]{8,}$/).required(),
  })
  .label("UserCredentials");

// setting the required fields for a user being added
export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").regex(/^[a-zA-Z' ]{2,}$/).required(),
  lastName: Joi.string().example("Simpson").regex(/^[a-zA-Z' ]{2,}$/).required(),
}).label("UserDetails");

// defining addional fields are are created when a user to added to Mongo
export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// setting the schema expected when adding a placemark
export const PlacemarkSpec = Joi.object()
  .keys({
    placemarkName: Joi.string().required().example("The Spire").regex(/^[a-zA-Z0-9'@£$%^&*()? ]{2,}$/),
    description: Joi.string().required().example("Pointy Stick in Dublin").regex(/^[a-zA-Z0-9'@£$%^&*()? ]{1,}$/),
    categoryid: IdSpec,
    latitude: Joi.number().required().example("53.20"),
    longitude: Joi.number().required().example("-12.20"),
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  img: Joi.string().allow(null, ""),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

// defining the schema expected when creating a category
export const CategorySpec = Joi.object()
  .keys({
    categoryName: Joi.string().required().example("Landmarks").regex(/^[a-zA-Z0-9'@£$%^&*()? ]{2,}$/),
    userid: IdSpec,
    placemarks: PlacemarkArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
