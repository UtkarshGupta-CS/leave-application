"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

let LeaveSchema = new Schema({
  StartDate: {
    type: Date,
    min: Date("1970-01-01"),
    required: true
  },
  EndDate: {
    type: Date,
    min: Date("1970-01-01"),
    required: true
  },
  LeaveType: {
    type: String,
    enum: ["Formal", "Informal"],
    required: true
  },
  Reason: {
    type: String,
    required: true
  },
  RequestBy: {
    type: String,
    required: true
  },
  RequestedAt: {
    type: Date,
    min: Date("1970-01-01"),
    required: true
  },
  ApprovalStatus: {
    type: String,
    enum: ["Approved", "Not Approved"],
    required: true
  },
  ApprovedAt: {
    type: Date,
    min: Date("1970-01-01")
  }
});

module.exports = mongoose.model("Leave", LeaveSchema);
