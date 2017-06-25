"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

let LeaveSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  leaveType: {
    type: String,
    enum: ["Type1", "Type2", "Type3"],
    required: true
  },
  reason: {
    type: String,
    required: true
  }, 
  requestedBy: {
    type: String,
    required: true
  },/*
  requestedAt: {
    type: Date,
    required: true
  },*/
  approvalStatus: {
    type: String,
    enum: ["Approved", "Not Approved", "Rejected"],
  },
  approvedAt: {
    type: Date,
  }
});

module.exports = mongoose.model("Leave", LeaveSchema);
