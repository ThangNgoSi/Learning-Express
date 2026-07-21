const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }),
);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.set("Content-Type", "text/html");
    res.write(
      "<p> Session expires after 1 min of in activity: " +
        req.session.cookie.expires +
        "</p>",
    );
    res.end();
  } else {
    req.session.views = 1;
    res.end(" New session is started");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.views) {
    res.end("Profile page");
  } else {
    res.status(404);
    res.end("Not found");
  }
});

app.listen(3000, function () {
  console.log("Express Started on Port 3000");
});
