const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      // required: [true, "Description is required"],
      //unique: [true, "Description already exists"],
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required"],
      unique: [true, "Quantity already exists"],
    },
    status: {
      type: String,
      default: "Active",
    },
    pricing: {
      type: String,
      required: [true, "Pricing is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
