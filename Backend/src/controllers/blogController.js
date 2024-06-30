import blogModel from "../models/mainContent.js";

const getallBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({ user: req.user._id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: "error occured on getting blogs" });
  }
};
const createblog = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    if (title && category && content) {
      const newBlog = new blogModel({
        title: title,
        content: content,
        category: category,
        thumbnail: req.file.filename,
        user: req.user._id,
      });
      const svblog = await newBlog.save();
      if (svblog) {
        return res.status(201).json({ message: "Blog created sucesfully" });
      }
      return res
        .status(400)
        .json({ message: "Some error occured while creating blog" });
    }
    return res.status(400).json({ message: "All fields are required" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
const getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const idBlog = await blogModel.findById(id);
    if (!idBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(idBlog);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

export { getBlogById, getallBlogs, createblog };
