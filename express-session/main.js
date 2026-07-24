const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public/css")));
app.use("/public", express.static(path.join(__dirname, "public/js")));
app.use("/public", express.static(path.join(__dirname, "public/images")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "views/index.html"));
  } else {
    req.session.user = {
      name: "Thang",
      age: 35,
    };
    res.send("Da tao session moi! Hay truy cap /profile ngay bay gio.");
  }
});

app.get("/contact", (req, res) => {
  if (req.session.user) {
    res.status(200);
    res.sendFile(path.join(__dirname, "views/contact.html"));
  } else {
    res.status(404);
    res.sendFile(path.join(__dirname, "views/error.html"));
  }
});

app.get("/courses", (req, res) => {
  if (req.session.user) {
    res.status(200);
    res.sendFile(path.join(__dirname, "views/courses.html"));
  } else {
    res.status(404);
    res.sendFile(path.join(__dirname, "views/error.html"));
  }
});

app.get("/thanks", (req, res) => {
  if (req.session.user) {
    res.status(200);
    res.sendFile(path.join(__dirname, "views/thanks.html"));
  } else {
    res.status(404);
    res.sendFile(path.join(__dirname, "views/error.html"));
  }
});

app.post("/", (req, res) => {
  if (req.session.user) {
    const { email } = req.body;
    console.log(email);
    res.status(200);
    res.sendFile(path.join(__dirname, "views/thanks.html"));
  } else {
    res.status(404);
    res.sendFile(path.join(__dirname, "views/error.html"));
  }
});

app.listen(3000, function () {
  console.log("Express Started on Port 3000");
});
