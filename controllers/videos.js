import Video from "../models/Video.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const addVideo = asyncHandler(async (req, res) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  const savedVideo = await newVideo.save();
  res.status(200).json(savedVideo);
});

export const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error("Video not found");
  }
  if (req.user.id === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } else {
    res.status(403);
    throw new Error("You can update only your video");
  }
});

export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (req.user.id === video.userId) {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Video has been deleted");
  } else {
    res.status(403);
    throw new Error("You can delete only your video");
  }
});

export const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error("Video not found!");
  }

  res.status(200).json(video);
});

export const addView = asyncHandler(async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });
  res.status(200).json("The view has been increased");
});

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trends = asyncHandler(async (req, res) => {
  const videos = await Video.find().sort({ views: -1 });
  res.status(200).json(videos);
});

export const sub = asyncHandler(async (req, res) => {
  const user = User.findById(req.user.id);
  const subscribedChannels = user.subscribedUsers;

  const list = await Promise.all(
    subscribedChannels.map((channelId) => {
      return Video.find({ userId: channelId });
    })
  );
  res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
});

export const getByTags = asyncHandler(async (req, res, next) => {
  const tags = req.query.tags.split(",");

  const videos = await Video.find({ tags: { $in: tags } }).limit(20);
  res.status(200).json(videos);
});

export const search = async (req, res) => {
  const query = req.query.q;

  const videos = await Video.find({
    title: { $regex: query, $options: "i" },
  }).limit(40);
  res.status(200).json(videos);
};
