import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) {
    res.status(400);
    throw new Error("Username is required");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(409);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await User.create({ ...req.body, password: hash });
  res.status(201).send("User created");
});

export const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(400);
    throw new Error("Username is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if(!isPasswordCorrect){
    res.status(400)
    throw new Error('Password do not match')
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const {password: userPassword, ...others} = user._doc

  res.cookie('accessToken', token, {httpOnly: true, sameSite: 'strict'}).status(200).json(others)
});
