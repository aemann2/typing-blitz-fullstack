import React, { useContext } from 'react';
import classes from './css/Difficulty.module.scss';
import { GameStateContext } from '../../context/GameStateContext';
import { motion } from 'framer-motion';

const groupVariants = {
	show: {
		transition: {
			delay: 0.4,
			staggerChildren: 0.3,
		},
	},
};

const buttonVariants = {
	hidden: {
		x: '-100vw',
	},
	show: {
		x: 1,
	},
};

const Difficulty = () => {
	const { isTimeOut, setDifficulty } = useContext(GameStateContext);

	const handleClick = (e) => {
		setDifficulty(e.target.value);
	};

	return (
		<>
			{isTimeOut && (
				<motion.div
					className={classes.difficulty}
					variants={groupVariants}
					initial='hidden'
					animate='show'
				>
					<motion.button
						className={classes.button}
						onClick={handleClick}
						variants={buttonVariants}
						value='easy'
					>
						easy
					</motion.button>
					<motion.button
						className={classes.button}
						onClick={handleClick}
						variants={buttonVariants}
						value='medium'
					>
						medium
					</motion.button>
					<motion.button
						className={classes.button}
						onClick={handleClick}
						variants={buttonVariants}
						value='hard'
					>
						hard
					</motion.button>
				</motion.div>
			)}
		</>
	);
};

export default Difficulty;
