import { User } from "../models/index.js";
import crypto from "crypto-js";
import dotenv from "dotenv";
import { statusMessages } from "../config/index.js";
dotenv.config();
const signup = async (req, res) => {
  try {
    const { body } = req.body;
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
    newUser.save().then(() => {
      return res.status(200).send(statusMessages.USER_SAVE_SUCCESS);
    });
  } catch (err) {
    console.log(err, "error in saving user");
    return res.status(422).send(err);
  }
};
const login = async (req, res) => {
  console.log("inLogin");
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send("All the fields are required");
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      const bytes = crypto.AES.decrypt(
        savedUser.password,
        process.env.SECRET_KEY
      );
      const unhashpassword = bytes.toString(crypto.enc.Utf8);
      if (unhashpassword === password) {
        return res.status(200).send(statusMessages.USER_LOGIN_SUCCESS);
      } else
        return res.status(401).send(statusMessages.USER_LOGIN_PASSWORD_FAILURE);
    } else {
      return res.send(statusMessages.USER_LOGIN_FAILURE);
    }
  } catch (err) {
    console.log(err, "error in login");
    return res.send(err);
  }
};
export { signup, login };
