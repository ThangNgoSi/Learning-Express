const express = require("express");
const User = require("./userModel");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config({ path: "./atlas-credentials.env" });

/*
 * Khởi tạo biến Express, Khởi tạo biến mongoose, Khởi tạo biến PORT
 * Khởi tạo biến jwt: là biến để khởi tạo token,
 * Khởi tạo biến env: là biến môi trường và cấu hình env.config
 * Viết các middleware: app.use(express.json()), app.use(express.urlencoded({ extended: true })),
 * Viết các route: app.post("/login", async (req, res, next) => {...}, app.post("/signup", async (req, res, next) => {...})
 * Khởi tạo kết nối cơ sở dữ liệu: mongoose.connect(), kết nối thành công khởi tạo server.
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      const data = {
        userId: user._id,
        email: user.email,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
      res.status(200).json({ token });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = User({ name, email, password });
    await user.save();
    const data = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
