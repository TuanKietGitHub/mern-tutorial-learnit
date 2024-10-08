require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iqe9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongooDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server  started on port ${PORT}`));
