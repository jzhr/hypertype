"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express = require("express");
var router = express.Router();
exports.router = router;
var Score = require("../models/score");
router.get("/", function (res) {
    res.send("Hello from Turbo Typer API.");
});
router.get("/scores", function (res, next) {
    Score.find({}, "score")
        .then(function (data) { return res.json(data); })
        .catch(next);
});
router.get("/scores/leaderboard", function (res, next) {
    Score.find({ score: { $exists: true } })
        .sort({ score: -1 })
        .limit(5)
        .then(function (data) { return res.json(data); })
        .catch(next);
});
router.post("/scores", function (req, res, next) {
    if (req.body.score) {
        Score.create(req.body)
            .then(function (data) { return res.json(data); })
            .catch(next);
    }
    else {
        res.json({
            error: "The input field is empty",
        });
    }
});
router.delete("/scores/:id", function (req, res, next) {
    Score.findOneAndDelete({ _id: req.params.id })
        .then(function (data) { return res.json(data); })
        .catch(next);
});
module.exports = router;
