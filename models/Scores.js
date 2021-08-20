const mongoose = require('mongoose');

// setting up the schema for our db entries 
const ScoreSchema = new mongoose.Schema({
  // these are all the entries that will go into the DB when we enter something into the app
  player: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  score: {
    type: Number,
    required: [true, 'Please add a positive or negative number'],
  },
});

module.exports = mongoose.model('Scores', ScoreSchema);