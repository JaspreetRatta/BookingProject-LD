const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked : {
      type: Boolean,
      default: false,
    },
    isprofilePicture: {
      type: String,
      default: 'default-profile-picture.jpg', // Set a default profile picture
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
