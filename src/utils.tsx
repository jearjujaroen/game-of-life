export const checkVicinity = (
	row: Array<boolean>,
	rowIndex: number,
	itemIndex: number,
	grid: boolean[][]
) => {
	const middle = itemIndex;
	const left = itemIndex - 1;
	const right = itemIndex + 1;
	const leftHorizontal = row[left];
	const rightHorizontal = row[right];
	const topRow = grid[rowIndex - 1];
	const bottomRow = grid[rowIndex + 1];

	//each in the array returns a boolean
	const cellsToCheck = [
		leftHorizontal,
		rightHorizontal,
		topRow && topRow[middle],
		topRow && topRow[left],
		topRow && topRow[right],
		bottomRow && bottomRow[middle],
		bottomRow && bottomRow[left],
		bottomRow && bottomRow[right],
	];

	//reduce is iterating over each item in the array and checking for true or false and then computes the count
	const liveNeighborCount = cellsToCheck.reduce((count, cellIsAlive) => {
		return cellIsAlive ? count + 1 : count;
	}, 0);

	return liveNeighborCount;
};

export const advance = (grid: boolean[][]) =>
	grid.map((row, rowIndex) => {
		return row.map((item, itemIndex) => {
			const liveNeighborCount = checkVicinity(row, rowIndex, itemIndex, grid);

			const deadOrAlive = item
				? liveNeighborCount === 2 || liveNeighborCount === 3
				: liveNeighborCount === 3;
			return deadOrAlive;
		});
	});
