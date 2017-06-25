const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

let app = new express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/src"));

mongoose.connect("mongodb://localhost:27017/leave", err => {
  if (err) {
    console.log("not connected to the db: " + err);
  } else {
    console.log("Successfully connected to db");
  }
});
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);
app.listen(port, () => console.log("Listening on port:" + port));
