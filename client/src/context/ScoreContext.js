import React, { createContext, useState } from 'react';

export const ScoreContext = createContext();

const ScoreContextProvider = (props) => {
	const [score, setScore] = useState(0);
	const [dbData, setDbData] = useState([]);

	return (
		<ScoreContext.Provider value={{ score, setScore, dbData, setDbData }}>
			{props.children}
		</ScoreContext.Provider>
	);
};

export default ScoreContextProvider;
