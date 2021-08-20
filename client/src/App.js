import './App.scss';
import Score from './components/score/Score';
import Countdown from './components/timer/Timer';
import WordChanger from './components/wordChanger/WordChanger';
import Difficulty from './components/difficulty/Difficulty';
import RoundEndModal from './components/roundendmodal/RoundEndModal';
import CombinedContextProvider from './context/CombinedContextProvider';
import GameStartModal from './components/gamestartmodal/GameStartModal';

function App() {
	return (
		<div className='app'>
			<main>
				<CombinedContextProvider>
					<GameStartModal />
					<Score />
					<Countdown />
					<div className='centerWrapper'>
						<WordChanger />
						<Difficulty />
					</div>
					<RoundEndModal />
				</CombinedContextProvider>
			</main>
		</div>
	);
}

export default App;
