import { useEffect, useState } from 'react';
import Grid from '../utils/Grid';
import Tile from '../utils/Tile';

const Home = () => {
	const [gridSize, setgridSize] = useState(4);
	useEffect(() => {
		const board = document.getElementById('game-board');
		const grid = new Grid(board, gridSize);
		console.log(grid.randomEmptyCell());
		grid.randomEmptyCell().tile = new Tile(board);
		grid.randomEmptyCell().tile = new Tile(board);
	}, [gridSize]);

	return (
		<>
			<div id="game-board" name="gameBoard"></div>
		</>
	);
};

export default Home;
