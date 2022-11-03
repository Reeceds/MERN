const express = require("express");
const app = express();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

app.get("/api/quote", async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
        const decoded = jwt.verify(token, "secret123");
        const email = decoded.email;
        const user = await User.findOne({ email: email });

        return res.json({
            status: "ok",
            id: user.id,
            email: user.email,
            quote: user.quote,
        });
    } catch (error) {
        console.log(error);
        return res.json({ status: "error", error: "invalid token" });
    }
});

app.post("/api/quote", async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
        const decoded = jwt.verify(token, "secret123");
        const email = decoded.email;
        await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

        return res.json({ status: "ok" });
    } catch (error) {
        console.log(error);
        return res.json({ status: "error", error: "invalid token" });
    }
});

module.exports = app;
