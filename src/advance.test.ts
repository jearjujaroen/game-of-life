import { advance } from './utils';

const _ = false;
const O = true;

it('toggles toad phase 1 -> 2', () => {
	const start = [
		[_, _, _, _, _, _],
		[_, _, _, O, _, _],
		[_, O, _, _, O, _],
		[_, O, _, _, O, _],
		[_, _, O, _, _, _],
		[_, _, _, _, _, _],
	];
	const end = [
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
		[_, _, O, O, O, _],
		[_, O, O, O, _, _],
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
	];
	expect(advance(start)).toEqual(end);
});

it('toggles toad phase 2 -> 1', () => {
	const start = [
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
		[_, _, O, O, O, _],
		[_, O, O, O, _, _],
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
	];
	const end = [
		[_, _, _, _, _, _],
		[_, _, _, O, _, _],
		[_, O, _, _, O, _],
		[_, O, _, _, O, _],
		[_, _, O, _, _, _],
		[_, _, _, _, _, _],
	];
	expect(advance(start)).toEqual(end);
});

it('toggles SIMPLE phase 1 -> 2', () => {
	const start = [
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
		[_, _, _, O, _, _],
		[_, _, O, _, _, _],
		[_, _, O, _, _, _],
		[_, _, _, _, _, _],
	];
	const end = [
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
		[_, _, O, O, _, _],
		[_, _, _, _, _, _],
		[_, _, _, _, _, _],
	];
	expect(advance(start)).toEqual(end);
});
