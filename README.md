# @krznbtni/rollup-plugin-svelte-component-barrel-file

This repo/package/whatever creates a barrel file for your Svelte components.

## Command Cheat Sheet

### Clean

To delete the output from past builds:

```bash
npm run clean
```

### Prepack

Used by NPM before packing, in preparation for publishing to a registry. In this package's/repository's case, it runs the `build` script.

### Publish Dry Run

```bash
npm publish --dry-run
```

### Publish

`--access=public` is needed for scoped packages since they are private by default.

```bash
npm publish --access=public
```
