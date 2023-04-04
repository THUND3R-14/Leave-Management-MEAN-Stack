const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userid: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  joinDate: {
    type: String,
  },
  leaveBalance: {
    type: Number,
    default: 10,
  },
  paid: {
    type: Number,
    default: 0,
  },
  unpaid: {
    type: Number,
    default: 0,
  },
});

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const leaveRecordSchema = new mongoose.Schema({
  userid: {
    type: Number,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  leaveReason: {
    type: String,
  },
});

let userCollection = mongoose.model("user", userSchema);
let adminCollection = mongoose.model("admin", adminSchema);
let leaveRecordCollection = mongoose.model("leaverecord", leaveRecordSchema);

module.exports = { userCollection, adminCollection, leaveRecordCollection };
