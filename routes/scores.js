const express = require('express');
const router = express.Router();
const {getScores, postScore} = require('../controllers/scoreController');

// routes to '/', runs a get request w/ getScores
router
  .route('/')
  .get(getScores)
  .post(postScore)

module.exports = router;

