import { timeStamp } from "console";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{timeStamps:true});

export default mongoose.models.User || mongoose.model("Post", postSchema);
