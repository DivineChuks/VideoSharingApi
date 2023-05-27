import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const updateUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } else {
    res.status(403);
    throw new Error("You can only update your account");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "User deleted!" });
  } else {
    res.status(403);
    throw new Error("You can only delete your account");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(403);
    throw new Error("User does not exist");
  }
  res.status(200).json(user);
});

export const subscribeUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { subScribedUsers: req.params.id },
  });

  await User.findByIdAndUpdate(req.params.id, {$inc: {subscribers: 1}})

  res.status(200).json('Subscription successful')
});

export const unSubscribeUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, {$pull: {subscribedUsers: req.params.id}})
    await User.findByIdAndUpdate(req.params.id, {$inc: {subscribers: -1}})
    res.status(200).json('unsubscription successful')
});

export const likeUser = asyncHandler(async (req, res) => {});

export const unlikeUser = asyncHandler(async (req, res) => {});
