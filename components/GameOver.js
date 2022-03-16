import GOIcon from './GOIcon';
import Image from 'next/image';
import winIcon from '../public/win.svg';

const GameOver = ({ resetGrid, status }) => {
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
					{status === 'win' && <Image src={winIcon} alt="You won"></Image>}
					{status === 'loose' && <GOIcon />}
				</div>
				<button onClick={resetGame}>
					{status === 'win' ? 'Play Again' : 'Reset Game'}
				</button>
			</div>
		</div>
	);
};

export default GameOver;
