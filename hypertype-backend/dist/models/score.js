"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Score = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ScoreSchema = new Schema({
    score: {
        type: String,
        required: [true, "The score text field is required"],
    },
});
var Score = mongoose.model("score", ScoreSchema);
exports.Score = Score;
