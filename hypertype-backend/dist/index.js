"use strict";
var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./routes/api");
var mongoose = require("mongoose");
require("dotenv").config();
// Create server and port
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "build")));
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});
// Connect to database
dotenv.config();
var uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(function () {
    console.log("MONGO CONNECTED");
})
    .catch(function (err) { return console.log(); });
app.use(cors());
app.use(bodyParser.json());
// Set up routing
app.get("/", function (res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/api", routes);
