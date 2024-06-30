import authModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRegistration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (username && email && password) {
      const availUser = await authModel.findOne({ email: email });
      if (availUser) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new authModel({
        username: username,
        email: email,
        password: hashPassword,
      });
      const saveUser = await newUser.save();
      if (saveUser) {
        console.log(
          "User registered successfully",
          username,
          email,
          password,
          hashPassword
        );
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    } else {
      return res.status(400).json({ message: "Enter proper crerdentials" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Invalid username or email" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(403).json({ message: "Enter redentials" });
    }
    const user = await authModel.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
      });
      return res
        .status(200)
        .json({ message: "Login successful", token, name: user.username });
    }
    return res.status(403).json({ message: "Invalid Password" });
    //token genereation
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Both email and password are required" });
  }
};

export { userRegistration, loginUser };
