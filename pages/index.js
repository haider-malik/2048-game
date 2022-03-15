import { useEffect, useState } from 'react';
import GameOver from '../components/GameOver';
import Grid from '../utils/Grid';
import { activeCellsObj, setUpInput } from '../utils/Script';
import Tile from '../utils/Tile';

const Home = () => {
	const [gridSize, setgridSize] = useState(4);
	const [activeLen, setActiveLen] = useState(0);

	useEffect(() => {
		const board = document.getElementById('game-board');
		const grid = new Grid(board);
		setgridSize(Math.floor(Math.sqrt(grid.cells.length)));

		const savedActiveCells = sessionStorage.getItem('activeCells');
		if (savedActiveCells && savedActiveCells !== 'null') {
			grid.recover(JSON.parse(savedActiveCells), board);
		} else {
			grid.randomEmptyCell().tile = new Tile(board);
			grid.randomEmptyCell().tile = new Tile(board);
			let active = grid.activeCellsObj;
			sessionStorage.setItem('activeCells', JSON.stringify(active));
		}

		setUpInput(grid, board);
	}, [gridSize]);

	const resetGrid = () => {
		sessionStorage.setItem('activeCells', 'null');
	};

	return (
		<>
			<div id="game-board" name="gameBoard"></div>
			<GameOver resetGrid={resetGrid}></GameOver>
		</>
	);
};

export default Home;
