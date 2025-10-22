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

const tsFileRules = {
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-debugger': 'error',
  'no-empty-function': 'warn',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  'prefer-const': 'error',
  eqeqeq: ['error', 'always'],
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
  tsFileRules['simple-import-sort/imports'] = 'error';
  tsFileRules['simple-import-sort/exports'] = 'error';
}

const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nx.configs['flat/base'],
  prettier,
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ...(simpleImportSortPlugin
      ? { plugins: { 'simple-import-sort': simpleImportSortPlugin } }
      : {}),
    rules: {
      ...tsFileRules,
    },
  },
];

export default baseConfig;
