const Info = () => {
	return (
		<div
			className="info_cover"
			id="comp_info"
			onClick={(e) => e.target.classList.remove('show')}
		>
			<div className="info_body">
				<span className="info_text">
					<p>
						Combine tiles of the same number in an attempt to create a tile with
						the value 2048.
					</p>

					<p>
						Pressing the arrow keys or swiping across the game board will move
						all tiles in the direction of the key pressed/swipe.
					</p>

					<p>
						After all the tiles are done moving a new tile with the value of 2
						or 4 will be created in a random empty cell.
					</p>

					<p>
						Two tiles with the same number will merge when they collide to
						create a single tile with double the value.
					</p>

					<p>
						The game is over when there are no valid ways for you to move the
						tiles.
					</p>
				</span>
			</div>
		</div>
	);
};

export default Info;
