const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["Accepted", "Pending", "Declined"] },
});

module.exports = mongoose.model("Friend", FriendSchema);
