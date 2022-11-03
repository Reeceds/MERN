const express = require("express");
const app = express();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

app.post("/api/register", async (req, res) => {
    try {
        // Hashes (encrypts) the password in the database
        const newPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });

        res.json({ status: "ok" });
    } catch (err) {
        console.log(err);
        res.json({ status: "error", error: "Duplicate email" });
    }
});

module.exports = app;
