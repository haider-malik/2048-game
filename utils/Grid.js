import Tile from './Tile';

let GRID_SIZE = 4;
const CELL_SIZE = 15;
const CELL_GAP = 2;

export default class Grid {
	#cells;
	constructor(gridElement) {
		gridElement.style.setProperty('--grid-size', GRID_SIZE);
		gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
		gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
		this.#cells = createCellElement(gridElement).map((cellElement, index) => {
			let x = index % GRID_SIZE;
			let y = Math.floor(index / GRID_SIZE);
			return new Cell(cellElement, x, y);
		});
	}

	get activeCellsObj() {
		const activeCells = this.#cells.filter((cell) => cell.tile != null);
		const active = {};
		for (let i = 0; i < activeCells.length; i++) {
			active[i] = {
				x: activeCells[i].x,
				y: activeCells[i].y,
				tileValue: activeCells[i].tile.value,
			};
		}
		return active;
	}

	get cells() {
		return this.#cells;
	}

	get cellsByRow() {
		return this.#cells.reduce((cellGrid, cell) => {
			cellGrid[cell.y] = cellGrid[cell.y] || [];
			cellGrid[cell.y][cell.x] = cell;
			return cellGrid;
		}, []);
	}

	get cellsByColumn() {
		return this.#cells.reduce((cellGrid, cell) => {
			cellGrid[cell.x] = cellGrid[cell.x] || [];
			cellGrid[cell.x][cell.y] = cell;
			return cellGrid;
		}, []);
	}

	get #emptyCells() {
		return this.#cells.filter((cell) => cell.tile == null);
	}

	randomEmptyCell = () => {
		const randomIdx = Math.floor(Math.random() * this.#emptyCells().length);
		return this.#emptyCells()[randomIdx];
	};

	recover(activeCells, board) {
		for (let key in activeCells) {
			const cell = activeCells[key];
			const idx = 4 * cell.y + cell.x;
			this.#cells[idx].tile = new Tile(board);
			this.#cells[idx].tile.value = cell.tileValue;
		}
	}
}

class Cell {
	#cellElement;
	#x;
	#y;
	#tile;
	#mergeTile;

	constructor(element, x, y) {
		this.#cellElement = element;
		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get tile() {
		return this.#tile;
	}

	set tile(value) {
		this.#tile = value;
		if (value == null) return;
		this.#tile.x = this.#x;
		this.#tile.y = this.#y;
	}

	get mergeTile() {
		return this.#mergeTile;
	}

	set mergeTile(value) {
		this.#mergeTile = value;
		if (value == null) return;
		this.#mergeTile.x = this.#x;
		this.#mergeTile.y = this.#y;
	}

	canAccept(tile) {
		return (
			this.tile == null ||
			(this.mergeTile == null && this.tile.value === tile.value)
		);
	}

	mergeTiles() {
		if (this.tile == null || this.mergeTile == null) return;
		this.tile.value += this.mergeTile.value;
		this.mergeTile.remove();
		this.mergeTile = null;
		const currTile = this.tile;

		currTile.animate().then(() => {
			setTimeout(() => {
				currTile.unanimate();
			}, 100);
		});
	}
}

function createCellElement(gridElement) {
	const cells = [];
	for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cells.push(cell);
		gridElement.append(cell);
	}
	return cells;
}
