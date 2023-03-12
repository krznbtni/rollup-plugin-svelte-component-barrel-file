import {PACKAGE_NAME} from './package-name.js';
import {isNonEmptyString} from './is-non-empty-string.js';

export const ERROR_MESSAGE = `${PACKAGE_NAME}: invalid path to components dir. Value must be a non-empty string OR left blank.`;

export function assertPathAliasToComponentsDir(value: unknown): asserts value is string {
	if (!isNonEmptyString(value)) {
		throw new Error(ERROR_MESSAGE);
	}
}
