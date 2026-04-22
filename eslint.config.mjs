// Root ESLint config — covers the shared/ workspace only.
// Frontend and backend each carry their own config tuned to their runtime.
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'node_modules',
    '**/node_modules',
    'frontend',
    'backend',
    'dist',
    '**/dist',
    'build',
    '**/build',
    '.husky',
    '**/routeTree.gen.ts',
  ]),
  {
    files: ['shared/**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: ['./shared/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
])
