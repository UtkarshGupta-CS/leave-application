"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

let UserSchema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
