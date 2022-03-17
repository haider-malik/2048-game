import { useEffect, useState } from 'react';
import GameOver from '../components/GameOver';
import Info from '../components/Info';
import InfoIcon from '../components/InfoIcon';
import Grid from '../utils/Grid';
import { setUpInput } from '../utils/Script';
import Tile from '../utils/Tile';

const Home = () => {
	const [gridSize, setgridSize] = useState(4);
	const [scores, setScores] = useState({
		score: '',
		max: '',
	});

	useEffect(() => {
		const board = document.getElementById('game-board');
		const grid = new Grid(board);
		setgridSize(Math.floor(Math.sqrt(grid.cells.length)));

		const savedActiveCells = sessionStorage.getItem('activeCells');
		if (savedActiveCells && savedActiveCells !== 'null') {
			grid.recover(JSON.parse(savedActiveCells), board);
			setScores(grid.maxAndScore);
		} else {
			grid.randomEmptyCell().tile = new Tile(board);
			grid.randomEmptyCell().tile = new Tile(board);
			let active = grid.activeCellsObj;
			sessionStorage.setItem('activeCells', JSON.stringify(active));
			setScores(grid.maxAndScore);
		}
		setUpInput(grid, board, setScores);
	}, [gridSize]);

	const resetGrid = () => {
		sessionStorage.setItem('activeCells', 'null');
	};

	const infoClicked = () => {
		const info = document.getElementById('comp_info');
		info.classList.add('show');
	};

	return (
		<>
			<div className="statsbar">
				<span>
					<span className="info_icon" onClick={infoClicked}>
						<InfoIcon />
					</span>
					Max Tile{` : `}
					<span className="max-score">{scores.max}</span>
				</span>
				<span>
					Score{` : `} <span className="score">{scores.score}</span>
				</span>
			</div>
			<div id="game-board" name="gameBoard"></div>
			<div id="author-info">
				<hr className="hrule" />
				<p>
					Developed by
					<a
						href="https://haidermalik.netlify.app/"
						target="_blank"
						rel="noreferrer"
					>
						Haider Malik
					</a>
				</p>
			</div>
			<GameOver
				resetGrid={resetGrid}
				status={scores.max === 2048 ? 'win' : 'loose'}
			></GameOver>
			<Info />
		</>
	);
};

export default Home;
