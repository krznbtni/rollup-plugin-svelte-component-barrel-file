import fs from 'node:fs/promises';

import chokidar from 'chokidar';
import glob from 'fast-glob';
import type {Plugin} from 'rollup';

import {assertPathAliasToComponentsDir} from './utils/assert-path-alias-to-components-dir.js';
import {assertPathToComponentsDir} from './utils/assert-path-to-components-dir.js';
import {filePathToComponentName} from './utils/file-path-to-component-name.js';
import {PACKAGE_NAME} from './utils/package-name.js';

async function buildBarrelContent(config: RollupPluginSvelteComponentBarrelFile): Promise<string> {
	const {pathToComponentsDir} = config;
	const filePaths = await glob(`${pathToComponentsDir}/**/*.svelte`);

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

function watchComponentsDir(config: RollupPluginSvelteComponentBarrelFile): chokidar.FSWatcher {
	const watcher = chokidar.watch(config.pathToComponentsDir, {
		persistent: true,
	});

	watcher.on('change', path => {
		if (path.endsWith('.svelte') || path.endsWith('index.ts')) {
			void writeNewBarrelFile(config);
		}
	});

	watcher.on('add', path => {
		if (path.endsWith('.svelte') || path.endsWith('index.ts')) {
			void writeNewBarrelFile(config);
		}
	});

	return watcher;
}

export interface RollupPluginSvelteComponentBarrelFile {
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

	let watcher: chokidar.FSWatcher | undefined = undefined;

	return {
		name: PACKAGE_NAME,
		async buildStart() {
			await writeNewBarrelFile(config);
			watcher = watchComponentsDir(config);
		},
		async buildEnd() {
			if (watcher) {
				await watcher.close();
			}
		},
	};
}
