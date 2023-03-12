import {describe, it, expect} from 'vitest';

import {
	assertPathAliasToComponentsDir,
	ERROR_MESSAGE,
} from './assert-path-alias-to-components-dir.js';

describe('assertPathAliasToComponentsDir', () => {
	it.each(['something', ' '])('should not throw if given valid arguments', args => {
		expect(assertPathAliasToComponentsDir(args)).toBeUndefined();
	});

	it.each(['', undefined, null, 1, ['hello']])('should throw if given invalid arguments', args => {
		expect(() => assertPathAliasToComponentsDir(args)).toThrowError(ERROR_MESSAGE);
	});
});
