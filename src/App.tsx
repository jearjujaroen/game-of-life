import React, { useState, useEffect } from 'react';
import './App.css';

import { TOAD, SIMPLE, RANDOM, BLANK } from './patterns';
import { advance } from './utils';

const patterns: any = {
	TOAD,
	SIMPLE,
	RANDOM,
	BLANK,
};

export default function App() {
	const [dropdownState, setDropdownState] = useState('TOAD');
	const [grid, setGrid] = useState(patterns[dropdownState]);
	const [gridStates, setGridStates] = useState([grid]);
	const [autoGenerate, setAutoGenerate] = useState(false);

	const advanceGrid = (grid: boolean[][]) => {
		const newGrid = advance(grid);

		if (JSON.stringify(grid) === JSON.stringify(newGrid)) {
			setAutoGenerate(!autoGenerate);
		} else {
			setGrid(newGrid);
			setGridStates([...gridStates, newGrid]);
		}
	};

	const flipCell = (x: number, y: number) => {
		const newGrid = grid.map((row: boolean[], rowIndex: number) =>
			row.map((item, columnIndex) =>
				x === rowIndex && y === columnIndex ? !item : item
			)
		);
		setGrid(newGrid);
	};

	useEffect(() => {
		if (autoGenerate) {
			const interval = setInterval(() => {
				advanceGrid(grid);
			}, 500);
			return () => clearInterval(interval);
		}
	}, [grid, autoGenerate, gridStates]);

	return (
		<div className='container'>
			<h1>Welcome to Conway's Game of Life!</h1>
			<div className='intro'>
				<select
					value={dropdownState}
					onChange={(e) => {
						const pattern = patterns[e.target.value];
						setGrid(pattern);
						setDropdownState(e.target.value);
					}}
				>
					{Object.keys(patterns).map((pattern) => (
						<option key={pattern} value={pattern}>
							{pattern}
						</option>
					))}
				</select>
				<p>
					<button onClick={() => advanceGrid(grid)}>
						One Step Advance Generation
					</button>
					<button onClick={() => setAutoGenerate(!autoGenerate)}>
						{!autoGenerate
							? 'Enable Auto Generation '
							: 'Disable Auto Generation'}
					</button>
				</p>
			</div>
			<div className='grid-container'>
				<div className='grid-background'>
					{grid.map((row: boolean[], i: number) => (
						<div key={i} className='row'>
							{row.map((item, j) => (
								<div
									key={j}
									className={item ? 'item item--alive' : 'item'}
									onClick={() => flipCell(i, j)}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<div>
				<p>
					<label htmlFor='states'>Grid States</label>
				</p>
				<input
					type='range'
					id='states'
					name='states'
					min='0'
					max={gridStates.length - 1}
					onChange={(e) => {
						const index: number = Number(e.target.value);
						setGrid(gridStates[index]);
					}}
				/>
			</div>
		</div>
	);
}
