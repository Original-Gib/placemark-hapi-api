// importing dependencies

import { User } from "./user.js";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const userMongoStore = {
  // method to retrieve all users
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  // method to retrieve a user by ID
  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  // method to add a user
  async addUser(user) {
    const newUser = new User(user);
    newUser.password = await bcrypt.hash(user.password, saltRounds)
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  // method to retrieve a user by email address
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  // method to delete a user by Id
  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all users
  async deleteAll() {
    await User.deleteMany({});
  },
};
