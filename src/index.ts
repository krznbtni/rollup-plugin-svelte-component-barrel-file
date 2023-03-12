import {name as PACKAGE_NAME} from '../package.json';

import fs from 'node:fs/promises';

import glob from 'fast-glob';
import type {Plugin} from 'rollup';

import {filePathToComponentName} from './utils/file-path-to-component-name';
import {assertPathToComponentsDir} from './utils/assert-path-to-components-dir';
import {assertPathAliasToComponentsDir} from './utils/assert-path-alias-to-components-dir';

async function buildBarrelContent(config: RollupPluginSvelteComponentBarrelFile): Promise<string> {
	const {pathToComponentsDir} = config;
	const filePaths = await glob(`${pathToComponentsDir}/*.svelte`);

	const barrelFileContent = filePaths.reduce((acc, curr) => {
		const componentName = filePathToComponentName(curr);

		let componentPath: string | undefined;

		if (config.pathAliasToComponentsDir) {
			componentPath = curr.replace(pathToComponentsDir, config.pathAliasToComponentsDir);
		} else {
			componentPath = curr.replace(pathToComponentsDir, '.');
		}

		if (componentName) {
			const exportStr = `export {default as ${componentName}} from '${componentPath}';`;
			return (acc += `${exportStr}\n`);
		}

		return acc;
	}, '');

	return barrelFileContent;
}

async function writeNewBarrelFile(config: RollupPluginSvelteComponentBarrelFile): Promise<void> {
	const pathToIndexFile = `${config.pathToComponentsDir}/index.ts`;
	const barrelFileContent = await buildBarrelContent(config);
	await fs.writeFile(pathToIndexFile, barrelFileContent);
}

async function watchComponentsDir(config: RollupPluginSvelteComponentBarrelFile): Promise<void> {
	const watcher = fs.watch(config.pathToComponentsDir, {recursive: true});

	for await (const event of watcher) {
		if (event.eventType === 'rename' && event.filename.endsWith('.svelte')) {
			await writeNewBarrelFile(config);
		}
	}
}

interface RollupPluginSvelteComponentBarrelFile {
	/**
	 * Use path.resolve - please
	 */
	pathToComponentsDir: string;
	/**
	 * Example: $lib/components
	 * Description: If left empty, the import paths will be relative
	 * i.e: ./path/to/SomeComponent.svelte
	 */
	pathAliasToComponentsDir?: string;
}

export default function rollupPluginSvelteComponentBarrelFile(
	config: RollupPluginSvelteComponentBarrelFile,
): Plugin {
	assertPathToComponentsDir(config.pathToComponentsDir);

	if (config.pathAliasToComponentsDir) {
		assertPathAliasToComponentsDir(config.pathAliasToComponentsDir);
	}

	return {
		name: PACKAGE_NAME,
		async buildStart() {
			await writeNewBarrelFile(config);
			void watchComponentsDir(config);
		},
	};
}
