import React, { useEffect, useContext } from 'react';
import classes from './css/WordChanger.module.scss';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import useKeypress from '../../hooks/useKeypress';
import Highlighter from '../highlighter/Highlighter';
import WordPreview from '../wordPreview/WordPreview';
import generateWords from '../../utils/randomWords';
import { motion } from 'framer-motion';

const wordVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 1.2,
		},
	},
};

const WordChanger = () => {
	const {
		wordArray,
		setWordArray,
		currentWord,
		setCurrentWord,
		substring,
		setSubstring,
	} = useContext(WordsContext);
	const { isTimeOut, difficulty, showRoundEndModal } =
		useContext(GameStateContext);

	useEffect(() => {
		if (!showRoundEndModal) {
			setWordArray(generateWords(difficulty));
		}
	}, [setWordArray, difficulty, showRoundEndModal]);

	useEffect(() => {
		setCurrentWord(wordArray[0]);
	}, [wordArray, setCurrentWord]);

	const changeCurrentWord = () => {
		setSubstring(null);
		const wordIndex = wordArray.indexOf(currentWord);
		setCurrentWord(wordArray[wordIndex + 1]);
	};

	useKeypress((e) => {
		e = e.key.toLowerCase();
		if (currentWord && !isTimeOut) {
			// if a substring has been created (after a first character has been typed)
			if (substring) {
				// if it's the last character and the right letter...
				if (e === substring[0] && substring.length === 1) {
					changeCurrentWord();
					// elif it's the right letter...
				} else if (e === substring[0]) {
					setSubstring(substring.slice(1, currentWord.length));
					// if it's the wrong letter
				} else {
					changeCurrentWord();
				}
			} else if (e === currentWord[0]) {
				// if it's the right character of the first letter, set the substring
				setSubstring(currentWord.slice(1, currentWord.length));
			} else {
				//otherwise, switch the word out
				changeCurrentWord();
			}
		}
	});

	return (
		<motion.div
			className={classes.wordList}
			variants={wordVariants}
			initial='hidden'
			animate='visible'
		>
			<Highlighter />
			<WordPreview />
		</motion.div>
	);
};

export default WordChanger;
