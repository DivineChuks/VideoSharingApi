import express from "express";
import {verifyToken} from "../config/db.js"
import {
  updateVideo,
  getVideo,
  addVideo,
  deleteVideo,
  addView,
  trends,
  random,
  sub,
  getByTags,
  search,
} from "../controllers/video.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trends", trends);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTags);
router.get("/search", search);

export default router;
