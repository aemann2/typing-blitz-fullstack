import GameStateContextProvider from './GameStateContext';
import WordsContextProvider from './WordsContext';
import ScoreContextProvider from './ScoreContext';

import combineComponents from '../utils/combineComponents';

const providers = [
	GameStateContextProvider,
	WordsContextProvider,
	ScoreContextProvider,
];

const CombinedContextProvider = combineComponents(...providers);

export default CombinedContextProvider;
