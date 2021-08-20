import React, { createContext, useState } from 'react';

export const GameStateContext = createContext();

const GameStateContextProvider = (props) => {
	const [isTimeOut, setIsTimeOut] = useState(true);
	const [difficulty, setDifficulty] = useState('easy');
	const [showRoundBeginModal, setShowRoundBeginModal] = useState(true);
	const [showRoundEndModal, setShowRoundEndModal] = useState(false);

	return (
		<GameStateContext.Provider
			value={{
				isTimeOut,
				setIsTimeOut,
				difficulty,
				setDifficulty,
				showRoundBeginModal,
				setShowRoundBeginModal,
				showRoundEndModal,
				setShowRoundEndModal,
			}}
		>
			{props.children}
		</GameStateContext.Provider>
	);
};

export default GameStateContextProvider;
