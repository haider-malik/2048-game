import Grid from './Grid';
import Tile from './Tile';

export function setUpInput(grid, board) {
	window.addEventListener(
		'keydown',
		(e) => {
			handleInput(e, grid, board);
		},
		{ once: true }
	);
}
export const handleInput = async (e, grid, board) => {
	if (
		!canMoveUp(grid) &&
		!canMoveDown(grid) &&
		!canMoveLeft(grid) &&
		!canMoveRight(grid)
	) {
		const goDiv = document.getElementById('game-over');
		goDiv.classList.add('over_show');
		return;
	}
	switch (e.key) {
		case 'ArrowUp':
			if (!canMoveUp(grid)) {
				setUpInput(grid, board);
				return;
			}
			await moveUp(grid);
			break;
		case 'ArrowDown':
			if (!canMoveDown(grid)) {
				setUpInput(grid, board);
				return;
			}
			await moveDown(grid);
			break;
		case 'ArrowLeft':
			if (!canMoveLeft(grid)) {
				setUpInput(grid, board);
				return;
			}
			await moveLeft(grid);
			break;
		case 'ArrowRight':
			if (!canMoveRight(grid)) {
				setUpInput(grid, board);
				return;
			}
			await moveRight(grid);
			break;
		default:
			setUpInput(grid, board);
			return;
	}
	// Other code here - merging tiles, etc.

	grid.cells.forEach((cell) => {
		cell.mergeTiles();
	});

	grid.randomEmptyCell().tile = new Tile(board);

	let active = grid.activeCellsObj;
	sessionStorage.setItem('activeCells', JSON.stringify(active));

	// Setting Up Input again after all done
	setUpInput(grid, board);
};

function moveUp(grd) {
	return slideTiles(grd.cellsByColumn);
}
function moveDown(grd) {
	return slideTiles(grd.cellsByColumn.map((column) => [...column].reverse()));
}
function moveLeft(grd) {
	return slideTiles(grd.cellsByRow);
}
function moveRight(grd) {
	return slideTiles(grd.cellsByRow.map((row) => [...row].reverse()));
}

function slideTiles(cells) {
	return Promise.all(
		cells.flatMap((group) => {
			const promises = [];
			for (let i = 1; i < group.length; i++) {
				const cell = group[i];
				if (cell.tile == null) continue;
				let lastValidCell = null;
				for (let j = i - 1; j >= 0; j--) {
					const moveToCell = group[j];
					if (!moveToCell.canAccept(cell.tile)) break;
					lastValidCell = moveToCell;
				}
				if (lastValidCell != null) {
					promises.push(cell.tile.waitForTransition());
					if (lastValidCell.tile != null) {
						lastValidCell.mergeTile = cell.tile;
					} else lastValidCell.tile = cell.tile;

					cell.tile = null;
				}
			}
		})
	);
}

function canMoveUp(grid) {
	return canMove(grid.cellsByColumn);
}
function canMoveDown(grid) {
	return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}
function canMoveLeft(grid) {
	return canMove(grid.cellsByRow);
}
function canMoveRight(grid) {
	return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}

function canMove(cells) {
	return cells.some((group) => {
		return group.some((cell, idx) => {
			if (idx === 0) return false;
			if (cell.tile == null) return false;
			const moveToCell = group[idx - 1];
			return moveToCell.canAccept(cell.tile);
		});
	});
}