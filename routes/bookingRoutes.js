const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post("/bookroom", (req, res) => {
    const { room,
        userid,
        frommonth,
        tomonth } = req.body
    try {
        const newBooking = new Booking({
            room : room.name,
            roomid : room._id,
            userid,
            frommonth,
            tomonth,
            transactionid : '1234'
        })
        newBooking.save();
        res.send('room booked Successfully');
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})
router.get("/test", (req, res) => {
    res.send("Booking routes are working");
});

module.exports = router;