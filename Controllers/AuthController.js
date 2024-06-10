import User from "../Models/UserSchema.js";
import { errorHandler } from "../Utils/Error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// signUp User
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All Fields Required"));
  }
  const hashedpassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error in register user"));
  }
};

//sign in User

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All the Fields Are Required"));
  }
  try {
    const userDetail = await User.findOne({ email });
    const userPassword = bcrypt.compareSync(password, userDetail.password);
    if (!userDetail || !userPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const token = jwt.sign({ id: userDetail._id }, process.env.JWT_SECRET_KEY);

    const { password: passKey, ...rest } = userDetail._doc; //to hide password from DB

    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", rest,token });
  } catch (error) {
    next(error);
  }
};

//Google authentication

export const google = async (req, res, next) => {
    const { email, name, profilePic } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET_KEY
        );
  
        const { password: passkey, ...rest } = user._doc;
  
        res
          .status(200)
          .cookie("access_Token", token, {
            httpOnly: true,
          })
          .json({ message: "User LoggedIn Successfully", rest });
      } else {
        const generatePassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatePassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: profilePic,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: userDetail._id },
          process.env.JWT_SECRET_KEY
        );
  
        const { password: passkey, ...rest } = userDetail._doc;
  
        res
          .status(200)
          /* .cookie("access_Token", token, {
            httpOnly: true,
          }) */
          .json({ message: "User LoggedIn Successfully", rest,token });
      }
    } catch (error) {
      next(error);
    }
  };