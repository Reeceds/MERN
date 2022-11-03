const express = require("express");
const app = express();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return res.json({ status: "error", error: "Invalid login" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            "secret123"
        );
        console.log("user token:", token);

        return res.json({ status: "ok", user: token });
    } else {
        return res.json({ status: "error", user: false });
    }
});

module.exports = app;
