import React, { useContext } from 'react';
import classes from './css/Score.module.scss';
import { ScoreContext } from '../../context/ScoreContext';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import useKeypress from '../../hooks/useKeypress';
import { motion } from 'framer-motion';

const scoreVariants = {
	hidden: {
		y: '100vh',
	},
	show: {
		y: 1,
		transition: {
			type: 'tween',
			duration: 1.2,
		},
	},
};

const Score = () => {
	const { score, setScore } = useContext(ScoreContext);
	const { currentWord, substring } = useContext(WordsContext);
	const { isTimeOut } = useContext(GameStateContext);

	useKeypress((e) => {
		e = e.key.toLowerCase();
		if (currentWord && !isTimeOut) {
			// if the key is the first letter of the current word, or if the substring exists and the key is the first letter...
			if (!substring && e === currentWord[0]) {
				setScore(score + 10);
			} else if (substring && e === substring[0]) {
				setScore(score + 10);
			} else {
				setScore(score - 10);
			}
		}
	});

	return (
		<>
			<motion.h2
				className={classes.score}
				variants={scoreVariants}
				initial='hidden'
				animate='show'
			>
				Score:{score}{' '}
			</motion.h2>
		</>
	);
};

export default Score;
