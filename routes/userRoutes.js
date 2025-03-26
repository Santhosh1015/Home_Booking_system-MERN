const express = require('express');
const router = express.Router();
const User = require("../models/user");

// Register Route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    const newUser = new User({ name, email, password });

    try {
        await newUser.save();
        res.status(201).send('User Registered Successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        
        if (user) {
            const temp={
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id
            }
            res.send(temp);
        } else {
            res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;