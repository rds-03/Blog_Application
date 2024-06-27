import express from "express";
import connection from "./src/config/dbaseConnect.js";
import "dotenv/config";
import blogRoute from "./src/routes/blog.js";
const app = express();
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", blogRoute);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
