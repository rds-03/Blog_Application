import mongoose from "mongoose";

const connection = async () => {
  try {
    const ct = await mongoose.connect(process.env.MONGOOSE_URL);
    if (ct) {
      console.log("Database connection successfully");
    }
  } catch (error) {
    console.error("error occured", error.message);
  }
};
export default connection;
