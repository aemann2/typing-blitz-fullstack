const Score = require('../models/Scores');

// all of our methods that will use the model to interact w/ the DB

// @desc    Gets all scores
// @route   GET /api/v1/scores
// @access  Public
exports.getScores = async (req, res, next) => {
	try {
		// using mongoose's find() method to get all the scores
		const scores = await Score.find().sort({ score: -1 });
		// return a 200 status w/ json data
		return res.status(200).json({
			// returning success and count, along with the actual data from the DB (via the transactions variable)
			success: true,
			count: scores.length,
			data: scores,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

// @desc    Adds a score
// @route   POST /api/v1/scores
// @access  Public
exports.postScore = async (req, res, next) => {
	try {
		// pulling out the data from the fields on the page.
		const { player, score } = req.body;

		// create the score entry with the player and score in the request body (i.e., what the client is sending over)
		const scoreData = await Score.create(req.body);

		// if it's created successfully, send a 201 status and the following JSON:
		return res.status(201).json({
			success: true,
			data: scoreData,
		});
	} catch (error) {
		if (error.name === 'ValidationError') {
			// if there's a validation error, pull our the error message and send it in a 400 response
			const messages = Object.values(error.errors).map(
				(value) => value.message
			);

			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	}
};
