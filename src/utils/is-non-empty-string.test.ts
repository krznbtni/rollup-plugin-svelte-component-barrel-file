import {describe, it, expect} from 'vitest';

import {isNonEmptyString} from './is-non-empty-string.js';

describe('isNonEmptyString', () => {
	it.each([
		{description: 'with length greater than 0', param: 'something'},
		{description: 'containing a whitespace', param: ' '},
	])('should return true for a string $description', ({param}) => {
		expect(isNonEmptyString(param)).toBe(true);
	});

	it.each([
		{description: 'an empty string', param: ''},
		{description: 'undefined', param: undefined},
		{description: 'null', param: null},
		{description: 'a number', param: 1},
		{description: 'an array containing one string', param: ['hello']},
	])('should return false for $description', ({param}) => {
		expect(isNonEmptyString(param)).toBe(false);
	});
});
