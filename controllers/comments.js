import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import asyncHandler from "express-async-handler";

export const addComment = asyncHandler(async (req, res) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  const savedComment = await newComment.save();
  res.status(200).json(savedComment);
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const video = await Video.findbyId(req.params.id);
  if (req.user.id === comment.userId || req.user.id === video.userId) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("The comment has been deleted");
  } else {
    return next(createError(403, "You can delete only your comments"));
  }
});

export const getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.status(200).json(comments);
});
