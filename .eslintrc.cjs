module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		es2017: true,
		node: true,
	},
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./configs/tsconfig.eslint.json'],
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['src/**/*.test.ts'],
			extends: ['plugin:vitest/recommended'],
		},
	],
	rules: {
		// JavaScript
		'arrow-body-style': ['error'],
		'no-unneeded-ternary': ['error', {defaultAssignment: false}],
		'no-unused-expressions': ['error'],
		'prefer-arrow-callback': ['error'],

		// TypeScript
		'@typescript-eslint/consistent-type-imports': ['error'],
		'@typescript-eslint/no-inferrable-types': ['error'],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
		],
	},
	ignorePatterns: ['*.cjs', 'node_modules'],
};
