import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
const userAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await authModel.findById(userID).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized User" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized User" });
  }
};

export default userAuthenticated;
