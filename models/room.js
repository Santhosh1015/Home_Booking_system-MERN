const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        maxCount: { type: Number, required: true },
        mobileNumber: { type: String, required: true },
        rentPerMonth: { type: Number, required: true },
        currentBookings: { type: Array, default: [] },
        imageURLs: { type: [String], required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;