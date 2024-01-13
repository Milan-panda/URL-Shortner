const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitHistory: [
      {
        timeStamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
