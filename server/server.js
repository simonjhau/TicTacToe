const express = require("express");
const app = express();

app.use(logger);

app.get("/", (req, res) => {
  console.log("Home page");
  res.send("Home Page");
});

app.get("/users", auth, (req, res) => {
  console.log(`User is admin = ${req.admin}`);
  res.send("Users Page");
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

function auth(req, res, next) {
  console.log("Auth");
  if (req.query.admin === "true") {
    req.admin = "true";
    next();
  } else {
    res.send("No Auth");
  }
}

app.listen(3000, () => console.log("Server Started"));
