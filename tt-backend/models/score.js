const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  score: {
    type: String,
    required: [true, 'The score text field is required']
  }
})

const Score = mongoose.model('score', ScoreSchema);

module.exports = Score;