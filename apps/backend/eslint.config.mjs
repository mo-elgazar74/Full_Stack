import pluginNest from 'eslint-plugin-nestjs';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['apps/backend/**/*.{ts,js}'],
    plugins: { nestjs: pluginNest, '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
    },
    // Start from the plugin's recommended rules
    ...(pluginNest.configs?.recommended ?? {}),
    rules: {
      // keep any defaults, then strengthen a few
      ...(pluginNest.configs?.recommended?.rules ?? {}),
      'nestjs/use-validation-pipe': 'error',
      'nestjs/use-dependency-injection': 'warn',
      'nestjs/parse-int-pipe': 'warn',
      'nestjs/deprecated-api-modules': 'warn',
      // Add some TS rules to surface warnings in backend
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
];
