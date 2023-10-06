const mongoose = require("mongoose");

const bookingTourSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "tour",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    transactionId: {
      type: String,
      require: true,
    },
    reviewStatus: {
      type: Boolean,
      default:false
    },
    category:{
      type:String,
      default:"tour"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookingsTour", bookingTourSchema);
