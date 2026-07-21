const express = require("express");
const app = express();
const path = require("path");
const {
  logger,
  getProfile,
  render,
  getData,
  postData,
  fetchDataFromDatabase,
} = require("./controller/controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public/images")));
app.use("/public", express.static(path.join(__dirname, "public/css")));
app.use("/public", express.static(path.join(__dirname, "public/js")));
app.use("/", express.static(path.join(__dirname, "views")));

app.set("view engine", "ejs");

app.use("/", logger);

/*
 * app.use() là phương thức của đối tượng Express để đăng ký các middleware cho ứng dụng.
 * Middleware có thể thực hiện các tác vụ như xác thực, ghi log, phân tích dữ liệu, xử lý lỗi, v.v.
 * Middleware cơ bản cơ bản bao gồm 3 tham số: req, res, next.
 * Sau chạy qua middleware, middleware sử dụng next() để chuyển sang middleware tiếp theo, hoặc sử dụng next(error) để chuyển sang middleware xử lý lỗi.
 * Khi một yêu cầu HTTP được gửi đến server, Express sẽ gọi các middleware theo thứ tự mà chúng được đăng ký.
 * app.use(express.json()) là một middleware được tích hợp sẵn trong Express để phân tích dữ liệu JSON từ body của yêu cầu HTTP.
 * app.use(express.urlencoded({ extended: true })) là một middleware được tích hợp sẵn trong Express để phân tích dữ liệu URL-encoded từ body của yêu cầu HTTP.
 */

/*
 * Express.static() là một middleware được tích hợp sẵn trong Express để phục vụ các tệp tĩnh như hình ảnh, CSS, JavaScript, v.v.
 * Express.static() nhận đường dẫn tuyệt đối đến thư mục chứa các tệp tĩnh và trả về một middleware function
 * Và đưa vào app.use() để đăng ký middleware này cho ứng dụng.
 * path.join(__dirname, "public/images") trả về đường dẫn tuyệt đối đến thư mục "public/images" trong dự án của bạn.
 */

/*
 * Trong Express, bạn có thể sử dụng phương thức res.status()
 * để đặt mã trạng thái HTTP cho phản hồi. Mặc định, nếu bạn không đặt mã trạng thái, express sẽ sử dụng mã 200.
 * res.set() sử dụng để set các header cho phản hồi HTTP.
 * Express sẽ sử dụng mã 200 (OK) cho các phản hồi thành công.
 * Tuy nhiên, bạn có thể thay đổi mã trạng thái theo nhu cầu của mình.
 * Lệnh res.send(), sử dụng để gửi dữ liệu phản hồi cho client.
 * Lệnh res.sendFile(path,callback(err)) được sử dụng để gửi một tệp từ server đến client.
 */

app.get("/profile", getProfile);

/*
 * app.set("view engine", "ejs"); sử dụng để tạo view engine cho Express.
 * Về cơ bản báo với Express rằng đọc file ejs và trả về giao diện cho client.
 * Lệnh res.render() sử dụng để gửi tệp view cho client.
 */

app.get("/", render);

/*
# Xử lý yêu cầu bất đồng bộ: như lấy dữ liệu từ Database
* Đăng ký middleware async/await
* Bên trong lấy dữ liệu về rồi xử lý logic dữ liệu như render file ejs
* Nếu gặp lỗi, chuyển sang nhánh catch, sử dụng res.status(500) để phản hồi người dùng.
*/

app.get("/data", getData);

app.post("/", postData);

/*
 * app.listen() là phương thức của đối tượng Express để khởi động server
 * và lắng nghe các yêu cầu đến từ client trên một cổng cụ thể.
 * Phương thức app.listen() cơ bản cơ bản bao gồm 2 tham số: PORT và callback function.
 */

module.exports = app;
