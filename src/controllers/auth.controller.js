import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({
      email,
    });

    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log({
      savedUser,
    });

    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
    res.header("auth-token", token).send(token);

    res.json({ user: savedUser._id });
  } catch (error) {
    console.log(error.message);
    if (error.code === 11000)
      return res.status(400).json({ error: "Email already registered" });

    console.log(error);
    next(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User does not exist" });

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.header("auth-token", token).send(token);

    res.json({ user: user._id });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user._id).select("-password");
  return res.json(userFound);
};
