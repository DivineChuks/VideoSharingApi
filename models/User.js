import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subScribedUsers: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
