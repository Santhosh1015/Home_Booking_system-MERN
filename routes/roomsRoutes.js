const express = require("express");
const router = express.Router();
const Room = require("../models/room");

router.get("/getallRoom", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching all rooms:", error);
        return res.status(400).json({ message: error.message });
    }
});

router.get("/getRoomById/:roomid", async (req, res) => {
    try {
        const { roomid } = req.params;


        const room = await Room.findById(roomid);

        res.json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;