import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStateContext } from '../../context/GameStateContext';
import classes from './css/GameStartModal.module.scss';

const backdropVariants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
	exit: { opacity: 1 },
};

const GameStartModal = () => {
	const { showRoundBeginModal, setShowRoundBeginModal } =
		useContext(GameStateContext);
	return (
		<AnimatePresence exitBeforeEnter>
			{showRoundBeginModal && (
				// this div represents the semi-transparent BG
				<motion.div
					className={classes.backdrop}
					variants={backdropVariants}
					animate='visible'
					initial='hidden'
					exit={{ opacity: 0, zIndex: 0 }}
				>
					{/* the actual modal popup */}
					<motion.div
						className={classes.modal}
						initial={{ y: '-100vh', opacity: 0 }}
						animate={{ y: '100px', opacity: 1, transition: { delay: 1.3 } }}
						transition={{ type: 'spring', stiffness: 500 }}
						exit={{ y: '-100vh' }}
					>
						<h2>Welcome to Typing Blitz!</h2>
						<p>Choose your difficulty, start the round, and try to keep up</p>
						<p>
							If your score is in the top 20, your name will go on the High
							Score list
						</p>
						<button
							className={classes.button}
							onClick={() => setShowRoundBeginModal(false)}
						>
							Got it!
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default GameStartModal;
