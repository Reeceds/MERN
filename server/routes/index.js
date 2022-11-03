const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Quote = require("./quote");
const Register = require("./register");
const Login = require("./login");

mongoose.connect("mongodb://localhost:27017/mern-user-auth");

app.use(cors());
app.use(express.json());

app.use("/", Quote);
app.use("/", Register);
app.use("/", Login);

app.listen(8080, () => {
    console.log("Server started on 8080");
});
