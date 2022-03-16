import Tile from './Tile';

let xdown = null;
let ydown = null;

export function setUpInput(grid, board, setScores) {
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

	if (grid.maxAndScore.max === 2048) {
		const goDiv = document.getElementById('game-over');
		goDiv.classList.add('over_show');
		return;
	}

	// on touch event listener
	window.addEventListener(
		'touchstart',
		(e) => {
			handleTouchStart(e, grid, board);
		},
		false
	);
	window.addEventListener(
		'touchmove',
		(e) => {
			handleTouchMove(e, grid, board, setScores);
		},
		false
	);

	// on keyboard keypress event listener
	window.addEventListener(
		'keydown',
		(e) => {
			handleInput(e, grid, board, setScores);
		},
		{ once: true }
	);
}
export const handleInput = async (e, grid, board, setScores) => {
	if (!e.key) return;
	switch (e.key) {
		case 'ArrowUp':
			if (!canMoveUp(grid)) {
				setUpInput(grid, board, setScores);
				return;
			}
			await moveUp(grid);
			break;
		case 'ArrowDown':
			if (!canMoveDown(grid)) {
				setUpInput(grid, board, setScores);
				return;
			}
			await moveDown(grid);
			break;
		case 'ArrowLeft':
			if (!canMoveLeft(grid)) {
				setUpInput(grid, board, setScores);
				return;
			}
			await moveLeft(grid);
			break;
		case 'ArrowRight':
			if (!canMoveRight(grid)) {
				setUpInput(grid, board, setScores);
				return;
			}
			await moveRight(grid);
			break;
		default:
			setUpInput(grid, board, setScores);
			return;
	}
	// Other code here - merging tiles, etc.

	grid.cells.forEach((cell) => {
		cell.mergeTiles();
	});

	grid.randomEmptyCell().tile = new Tile(board);

	let active = grid.activeCellsObj;
	sessionStorage.setItem('activeCells', JSON.stringify(active));
	setScores(grid.maxAndScore);

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
	if (grid.maxAndScore.max === 2048) {
		const goDiv = document.getElementById('game-over');
		goDiv.classList.add('over_show');
		return;
	}
	// Setting Up Input again after all done
	setUpInput(grid, board, setScores);
};

function getTouches(evt) {
	return (
		evt.touches || // browser API
		evt.originalEvent.touches
	); // jQuery
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xdown = firstTouch.clientX;
	ydown = firstTouch.clientY;
}

async function handleTouchMove(evt, grid, board, setScores) {
	if (!xdown || !ydown) {
		return;
	}

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xdown - xUp;
	var yDiff = ydown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		/*most significant*/
		if (xDiff > 0) {
			evt.key = 'ArrowLeft';
			/* right swipe */
		} else {
			evt.key = 'ArrowRight';
			/* left swipe */
		}
	} else {
		if (yDiff > 0) {
			/* down swipe */
			evt.key = 'ArrowUp';
		} else {
			evt.key = 'ArrowDown';
			/* up swipe */
		}
	}

	await handleInput(evt, grid, board, setScores);

	/* reset values */
	xdown = null;
	ydown = null;
}

// functions related to alter the grid
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
