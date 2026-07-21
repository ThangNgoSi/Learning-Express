function logger(req, res, next) {
  const currentTime = Date.now();
  console.log(`Request received at ${currentTime}`);
  next();
}

function getProfile(req, res) {
  res.status(200);
  const user = { name: "Thang", age: 35 };
  res.render("profile", { user });
}

function render(req, res, next) {
  console.log(next);
  //res.set("Content-Type", "image/png");
  res.status(200);
  res.sendFile(path.join(__dirname, "views/index.html"), (err) => {
    if (err) {
      res
        .status(500)
        .send("Không tìm thấy tệp hoặc có lỗi xảy ra khi gửi tệp.");
    }
  });
}

async function getData(req, res) {
  try {
    const data = await fetchDataFromDatabase();
    const user = { name: data.name, age: data.age };
    res.render("profile", { user });
  } catch (err) {
    res.status(500);
    res.send("Error fetching data");
  }
}

async function fetchDataFromDatabase() {
  return { name: "Thắng", age: 35 };
}

function postData(req, res) {
  console.log(req.body);
  const { email } = req.body;
  res.sendFile(path.join(__dirname, "views/thanks.html"), (err) => {
    if (err) {
      res
        .status(500)
        .send("Không tìm thấy tệp hoặc có lỗi xảy ra khi gửi tệp.");
    }
  });
}

module.exports = {
  logger,
  getProfile,
  render,
  getData,
  postData,
  fetchDataFromDatabase,
};
