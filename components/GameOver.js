import GOIcon from './GOIcon';

const GameOver = ({ resetGrid }) => {
	const resetGame = (e) => {
		const goDiv = document.getElementById('game-over');
		goDiv.classList.remove('over_show');
		resetGrid();
		window.location.reload();
	};

	return (
		<div className="over_cover" id="game-over">
			<div className="over_main">
				<div className="over_icon">
					<GOIcon />
				</div>
				<button onClick={resetGame}>Reset Game</button>
			</div>
		</div>
	);
};

export default GameOver;
