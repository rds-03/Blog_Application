import categoryModel from "../models/category.js";

const getCategory = async (req, res) => {
  try {
    const allCateg = await categoryModel.find({});
    res.status(200).json(allCateg);
  } catch (error) {
    return res.status(400).json({ message: "an error occured" });
  }
};
const addCategory = async (req, res) => {
  const { category } = req.body; //title is used in the video
  try {
    if (category) {
      const newCateg = new categoryModel({ title: category });
      const svectg = await newCateg.save();
      if (svectg) {
        console.log(newCateg);
        return res
          .status(201)
          .json({ message: "category created sucessfully" });
      }
      return res
        .status(400)
        .json({ message: "an error occured while adding category" });
    }
    return res.status(400).json({ message: "Category is required" });
  } catch (error) {}
};

export { getCategory, addCategory };
