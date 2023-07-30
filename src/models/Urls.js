const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    url: { type: String, required: true },
    shortUrl: { type: String, required: true },
    urlKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
