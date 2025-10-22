import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nx from '@nx/eslint-plugin';
import prettier from 'eslint-config-prettier';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

let simpleImportSortPlugin;
try {
  simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');
} catch {
  simpleImportSortPlugin = null;
}

const rules = {
  // Core rules
  eqeqeq: ['error', 'always'],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-debugger': 'error',
  'no-empty-function': 'warn',
  'prefer-const': 'error',

  // TypeScript rules
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

  // Enforce public API imports only
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['@core/*/src/*', '@feature/*/src/*', '@ui/*/src/*'],
          message: 'Import only from the library public API (index.ts).',
        },
      ],
    },
  ],

  // Nx module boundaries
  '@nx/enforce-module-boundaries': [
    'error',
    {
      enforceBuildableLibDependency: true,
      allow: [],
      depConstraints: [
        { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:ui', 'type:feature', 'type:core', 'type:shared'] },
        { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:core', 'type:ui', 'type:shared'] },
        { sourceTag: 'type:core', onlyDependOnLibsWithTags: ['type:shared'] },
        { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:shared'] },
        { sourceTag: 'type:shared', onlyDependOnLibsWithTags: ['type:shared'] },
      ],
    },
  ],
};

if (simpleImportSortPlugin) {
  rules['simple-import-sort/imports'] = 'error';
  rules['simple-import-sort/exports'] = 'error';
}

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nx.configs['flat/base'],
  prettier,
  {
    ignores: ['**/dist/**', '**/node_modules/**', '.nx/**', 'apps/backend/webpack.config.js'],
  },
  {
    files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'],
    ...(simpleImportSortPlugin ? { plugins: { 'simple-import-sort': simpleImportSortPlugin } } : {}),
    rules,
  },
];
