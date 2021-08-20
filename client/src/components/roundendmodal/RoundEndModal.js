import { useContext, useRef, useEffect, useState } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import classes from './css/RoundEndModal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { getRank } from '../../utils/helpers';
import axios from 'axios';

const backdropVariants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
	exit: { opacity: 1 },
};

const Popup = () => {
	const { showRoundEndModal, setShowRoundEndModal } =
		useContext(GameStateContext);
	const { score, setScore, dbData } = useContext(ScoreContext);
	const { currentWord, wordArray, setCurrentWord } = useContext(WordsContext);

	const [nameInitials, setNameInitials] = useState('');

	const button = useRef(null);

	async function postData() {
		try {
			await axios.post('/api/v1/scores', {
				player: nameInitials ? nameInitials : 'player',
				score: score,
			});
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = (e) => {
		setNameInitials(e.target.value.toUpperCase());
	};

	const handleClose = () => {
		postData();
		setShowRoundEndModal(false);
		const wordIndex = wordArray.indexOf(currentWord);
		setCurrentWord(wordArray[wordIndex + 1]);
		setNameInitials('');
		setScore(0);
	};

	useEffect(() => {
		if (button.current) {
			button.current.focus();
		}
	}, []);

	return (
		<AnimatePresence exitBeforeEnter>
			{showRoundEndModal && (
				// this div represents the semi-transparent BG
				<motion.div
					className={classes.backdrop}
					variants={backdropVariants}
					animate='visible'
					initial='hidden'
					exit={{ opacity: 0, zIndex: -1 }}
				>
					{/* the actual modal popup */}
					<motion.div
						className={classes.modal}
						initial={{ y: '-100vh', opacity: 0 }}
						animate={{ y: '100px', opacity: 1, transition: { delay: 0.51 } }}
						transition={{ type: 'spring', stiffness: 200 }}
						exit={{ y: '-100vh' }}
					>
						<h2>Time Up!</h2>
						<p>Your score is: {score}</p>
						{dbData ? (
							<div>
								<p>{`Rank: ${getRank(dbData, score)} out of ${
									dbData.length
								}`}</p>
								{getRank(dbData, score) <= 20 && (
									<div>
										<p className={classes.topScore}>
											...yay, you're in the top 20!{' '}
										</p>
										<p className={classes.topScore}>Enter your initials:</p>
										<input
											className={classes.input}
											placeholder={'ABC'}
											maxLength={3}
											value={nameInitials}
											onChange={handleChange}
										></input>
									</div>
								)}
								<div className={classes.buttons}>
									<button
										className={classes.button}
										ref={button}
										onClick={handleClose}
									>
										{getRank(dbData, score) <= 20
											? 'Submit Score and Play Again'
											: 'Play Again'}
									</button>
								</div>
								{dbData && (
									<div className={classes.tableWrapper}>
										<table className={classes.table}>
											<thead>
												<tr>
													<th>No.</th>
													<th>Score</th>
													<th>Name</th>
												</tr>
											</thead>
											<tbody>
												{dbData.slice(0, 20).map((player, index) => (
													<tr key={player._id}>
														<td>{index + 1}</td>
														<td>{player.score}</td>
														<td>{player.player}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</div>
						) : (
							'Loading scores...'
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Popup;
