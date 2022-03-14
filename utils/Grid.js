let GRID_SIZE;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
	#cells;
	constructor(gridElement, gridSize) {
		GRID_SIZE = gridSize;
		gridElement.style.setProperty('--grid-size', GRID_SIZE);
		gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
		gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
		this.#cells = createCellElement(gridElement).map((cellElement, index) => {
			let x = index % GRID_SIZE;
			let y = Math.floor(index / GRID_SIZE);
			return new Cell(cellElement, x, y);
		});
	}

	get #emptyCells() {
		return this.#cells.filter((cell) => cell.tile == null);
	}

	randomEmptyCell = () => {
		const randomIdx = Math.floor(Math.random() * this.#emptyCells().length);
		return this.#emptyCells()[randomIdx];
	};
}

class Cell {
	#cellElement;
	#x;
	#y;
	#tile;
	constructor(element, x, y) {
		this.#cellElement = element;
		this.#x = x;
		this.#y = y;
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
