import {describe, it, expect} from 'vitest';
import {helloWorld, goodBye} from './index';

describe('Hello World Function', () => {
	it('should return the hello world message', () => {
		const expected = 'Hello World from my example modern npm package!';
		const result = helloWorld();
		expect(result).toBe(expected);
	});
});

describe('Goodbye Function', () => {
	it('should return the goodbye message', () => {
		const expected = 'Goodbye from my example modern npm package!';
		const result = goodBye();
		expect(result).toBe(expected);
	});
});
