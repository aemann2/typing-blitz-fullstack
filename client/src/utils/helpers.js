export function getRank(scores, roundScore) {
	if (scores.length > 0) {
		if (roundScore > scores[0].score) {
			return 1;
		} else if (roundScore < scores[scores.length - 1].score) {
			return scores.length;
		} else {
			return scores.findIndex((entry) => roundScore >= entry.score) + 1;
		}
	}
}
