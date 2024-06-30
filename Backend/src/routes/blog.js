import express from "express";
import { userRegistration, loginUser } from "../controllers/userController.js";
import {
  getBlogById,
  getallBlogs,
  createblog,
} from "../controllers/blogController.js";
import { getCategory, addCategory } from "../controllers/categoryContrl.js";
import multer from "multer";
import userAuthenticated from "../middleWare/authMiddle.js";
//file handling
const path = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const router = express.Router();
const upload = multer({ storage: path });
//user routes
router.post("/users/register", userRegistration);
router.post("/users/login", loginUser);

//blog routes
router.get("/allblogs", userAuthenticated, getallBlogs);
router.get("/getblog/:id", userAuthenticated, getBlogById);
router.post(
  "/addblog",
  userAuthenticated,
  upload.single("thumbnail"),
  createblog
);

//category routes
router.get("/getcategory", userAuthenticated, getCategory);
router.post("/addcategory", userAuthenticated, addCategory);

export default router;
