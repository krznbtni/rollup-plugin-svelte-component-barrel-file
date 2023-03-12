import {name as PACKAGE_NAME} from '../../package.json';

import {isNonEmptyString} from './is-non-empty-string';

export const ERROR_MESSAGE = `${PACKAGE_NAME}: invalid path to components dir. Value must be a non-empty string OR left blank.`;

export function assertPathAliasToComponentsDir(value: unknown): asserts value is string {
	if (!isNonEmptyString(value)) {
		throw new Error(ERROR_MESSAGE);
	}
}
