import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		include: ['src/**/*.spec.ts'],
		exclude: ['dist', 'node_modules'],
		globals: true,
		environment: 'node',
	}
})
