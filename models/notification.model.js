const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  recepientEmails: {
    type: [String],
    required: true,
  },
  sentStatus: {
    type: String,
    required: true,
    default: "UN_SENT",
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
