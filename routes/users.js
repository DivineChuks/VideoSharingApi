import express from "express";
import {
  deleteUser,
  getUser,
  likeUser,
  subscribeUser,
  unSubscribeUser,
  unlikeUser,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/find/:id", getUser);
router.put("/sub/:id", verifyToken, subscribeUser);
router.put("/unsub/:id", verifyToken, unSubscribeUser);
router.put("/like/:videoId", verifyToken, likeUser);
router.put("/unlike/:videoId", verifyToken, unlikeUser);

export default router;
