import randomWords from 'random-words';

const generateWords = (difficulty) => {
	if (difficulty === 'easy') {
		// using set to remove duplicates
		return [...new Set(randomWords({ exactly: 1000, maxLength: 6 }))];
	} else if (difficulty === 'medium') {
		const wordArray = randomWords({ exactly: 1000, maxLength: 8 });
		return [...new Set(wordArray.filter((word) => word.length >= 6))];
	} else if (difficulty === 'hard') {
		const wordArray = randomWords({ exactly: 10000, maxLength: 12 });
		return [...new Set(wordArray.filter((word) => word.length >= 8))];
	}
};

export default generateWords;
