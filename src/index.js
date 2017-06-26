"use strict";

const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require("path"),
  session = require("express-session");

let app = express();
const port = process.env.PORT || 3000;

const router = express.Router();
const appRoutes = require("./routes.js")(router);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use(express.static(__dirname + "/src"));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/leave", err => {
  if (err) console.log("not connected to the db: " + err);
  else console.log("Successfully connected to db");
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);
app.listen(port, () => console.log("Listening on port:" + port));
