import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    refer: "category",
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    refer: "Auth",
  },
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
