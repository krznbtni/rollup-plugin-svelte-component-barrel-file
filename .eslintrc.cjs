module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./configs/tsconfig.eslint.json'],
		sourceType: 'module',
		ecmaVersion: 2021,
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
		{
			files: ['**/*.ts'],
			rules: {
				'no-shadow': 'off',
				'no-undef': 'off',
				'no-use-before-define': 'off',
			},
		},
	],
	rules: {
		// JavaScript
		'accessor-pairs': 'off',
		'array-bracket-spacing': 'off',
		'array-callback-return': 'error',
		'arrow-body-style': ['error', 'as-needed', {requireReturnForObjectLiteral: true}],
		'no-unneeded-ternary': ['error', {defaultAssignment: false}],
		'no-unused-expressions': 'error',
		'prefer-arrow-callback': 'error',

		// TypeScript
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/consistent-type-definitions': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-inferrable-types': 'error',
		'@typescript-eslint/no-redeclare': 'error',
		'@typescript-eslint/no-shadow': 'warn',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
		],
	},
	ignorePatterns: ['*.cjs', 'node_modules'],
};
