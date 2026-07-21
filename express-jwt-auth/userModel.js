const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

/*
 * Khởi tạo mongoose
 * Khởi tạo schema: Cấu trúc cơ sở dữ liệu
 * Khởi tạo model: Tạo Collection trong database
 * Export model
 */
