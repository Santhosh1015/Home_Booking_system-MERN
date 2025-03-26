const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURL = "mongodb+srv://san_Santhosh:San_amx3hmmm@cluster0.maj8a.mongodb.net/MERN-Rooms";
mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log("MongoDB connected Successfully"))
.catch(err => console.log("MongoDB connection FAILED:", err));


const roomsRoutes = require("./routes/roomsRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Mount Routes
app.use("/api/rooms", roomsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings" , bookingRoutes);

// Static Files
app.use("/images", express.static(path.join(__dirname, "images")));


const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));