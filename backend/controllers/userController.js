import { User } from "../models/index.js";
import crypto from "crypto-js";
import dotenv from "dotenv";
import { statusMessages } from "../config/index.js";
import jwt from "jsonwebtoken";
dotenv.config();
const TitleCase = (s) => {
  return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
};
const signup = async (req, res) => {
  try {
    const { body } = req;
    const { firstname, lastname, username, dob, email, password } = body;

    const hashPassword = crypto.AES.encrypt(password, process.env.SECRET_KEY);
    const newUser = new User({
      firstname,
      lastname,
      username,
      dob,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign(newUser.toJSON(), process.env.SECRET_KEY);
    return { newUser, token };
  } catch (err) {
    console.log(err, "error");
    const { name } = err;
    switch (name) {
      case "MongoServerError":
        const { code, keyValue } = err;
        let dupe = Object.keys(keyValue)[0];
        dupe = TitleCase(dupe);
        switch (code) {
          case 11000:
            throw { status: 422, message: `${dupe} is already taken` };
        }
        break;
      case "ValidationError":
        const { message } = err;
        const resToSend = message.split(":").slice(-1)[0].trim();
        throw { status: 422, message: resToSend };
    }
  }
};
const login = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    if (!email || !password) {
      throw { status: 422, message: "All the fields are required" };
    }
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      const bytes = crypto.AES.decrypt(
        savedUser.password,
        process.env.SECRET_KEY
      );
      const unhashpassword = bytes.toString(crypto.enc.Utf8);
      if (unhashpassword === password) {
        return savedUser;
      } else
        throw {
          status: 422,
          message: statusMessages.USER_LOGIN_PASSWORD_FAILURE,
        };
    } else {
      throw {
        status: 422,
        message: statusMessages.USER_LOGIN_FAILURE,
      };
    }
  } catch (err) {
    console.log(err, "error in login");
    throw err;
  }
};
export { signup, login };
