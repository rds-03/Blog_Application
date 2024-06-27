import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
