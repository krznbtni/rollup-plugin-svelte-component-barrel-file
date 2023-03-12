import {describe, it, expect} from 'vitest';

import {assertPathToComponentsDir, ERROR_MESSAGE} from './assert-path-to-components-dir.js';

describe('assertPathToComponentsDir', () => {
	it.each(['something', ' '])('should not throw if given valid arguments', args => {
		expect(assertPathToComponentsDir(args)).toBeUndefined();
	});

	it.each(['', undefined, null, 1, ['hello']])('should throw if given invalid arguments', args => {
		expect(() => assertPathToComponentsDir(args)).toThrowError(ERROR_MESSAGE);
	});
});
