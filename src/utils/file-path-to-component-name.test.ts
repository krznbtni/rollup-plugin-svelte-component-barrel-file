import {describe, it, expect} from 'vitest';

import {filePathToComponentName} from './file-path-to-component-name';

describe('filePathToComponentName', () => {
	it('should return the component name when given a file path', () => {
		const componentName = 'SomeComponent';
		const filePath = `/path/to/${componentName}.someExtension`;
		const result = filePathToComponentName(filePath);
		expect(result).toEqual(componentName);
	});

	it('should return undefined when given an empty string', () => {
		const filePath = '';
		const result = filePathToComponentName(filePath);
		expect(result).toBeUndefined();
	});

	it('should return undefined when the path does not end with a file extension', () => {
		const filePath = `/path/to/SomeComponent`;
		const result = filePathToComponentName(filePath);
		expect(result).toBeUndefined();
	});
});
