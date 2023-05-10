import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      required: true,
      unique: true,
      type: String,
    },
    tags: {
      type: Array,
      required: true,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
