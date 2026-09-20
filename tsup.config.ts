import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src'],
	clean: true,
	format: ['esm'],
	outDir: 'dist',
	loader: {
		'.sql': 'file',
	},
})
