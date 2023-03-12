export function filePathToComponentName(filePath: string): string | undefined {
	if (filePath.trim() === '') {
		return;
	}

	if (filePath.match(/(\.\w+$)/) === null) {
		return;
	}

	return filePath
		.split('/')
		.pop()
		?.replace(/\.\w+$/, '');
}
