import { useEffect, useState } from 'react';
import GameOver from '../components/GameOver';
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

	return (
		<>
			<div className="statsbar">
				<span>
					Max Tile{` : `}
					<span className="max-score">{scores.max}</span>
				</span>
				<span>
					Score{` : `} <span className="score">{scores.score}</span>
				</span>
			</div>
			<div id="game-board" name="gameBoard"></div>
			<GameOver
				resetGrid={resetGrid}
				status={scores.max === 2048 ? 'win' : 'loose'}
			></GameOver>
		</>
	);
};

export default Home;
