module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: `./tsconfig.eslint.json`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'no-instanceof',
    'no-only-tests',
    'react-hooks',
    'react',
    'sort-destructure-keys',
    'sort-keys-fix',
    'typescript-sort-keys',
    'unicorn',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: '18.2.0',
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /* Prettier handles this, but the prettier plugin does not turn it off. */
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        /* format PascalCase means use that format after the prefix is removed. */
        format: ['PascalCase'],
        prefix: ['is', 'should', 'are', 'has', 'can', 'did', 'will', 'was'],
        /* RegExp of variables that don't have to follow this rule. */
        filter: {
          /* The list of allowed names that don't need to conform to this rule. */
          regex: 'ok|disabled|required|readonly|loading',
          match: false,
        },
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'PascalCase', 'snake_case'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase'],
        filter: {
          /* Patterns to allow. */
          regex: '(_id|__typename|__element|__v|__order|allow_leading_zeroes)',
          match: false,
        },
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    /* Handled by Prettier. */
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': ['error'],
    /* TypeScript handles unused vars, so this is not needed in linting. */
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'array-callback-return': 'error',
    curly: ['error', 'all'],
    'default-case': 'error',
    'dot-notation': [
      'error',
      /* Allow when the property contains underscores, which is often needed for external APIs. */
      { allowPattern: '^(_[a-z]+)+$' },
    ],
    eqeqeq: 'error',
    'import/extensions': ['error', 'never', { css: 'always' }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    /* The "import/order" rule is defined within each package's .eslintrc.js file. */
    // 'import/order': 'off',
    'import/order': [
      `error`,
      {
        groups: [
          `builtin`,
          `external`,
          `internal`,
          `parent`,
          `sibling`,
          `index`,
        ],
        'newlines-between': `always`,
      },
    ],
    'import/prefer-default-export': 'off',
    /* TypeScript will take care of "named" and "namespace" */
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-commonjs': 'error',
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': 'off',
    /* Doesn't work properly in code editors. Not a big deal since TypeScript catches these. */
    'import/no-unresolved': 'off',
    'import/no-unassigned-import': ['error', { allow: ['typeface-open-sans'] }],
    'line-comment-position': ['error', { position: 'above' }],
    'max-len': [
      'error',
      {
        /**
         * Prettier handles line length for code, but in some circumstances it will go a little over
         * if the formatting necessitates it. The "code" value must be defined here or it will
         * default to 80. Making it double the prettier setting seems to work fine.
         */
        code: 200,
        comments: 100,
        ignoreUrls: true,
      },
    ],
    'max-params': ['error', 4],
    'one-var': ['error', 'never'],
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],
    'no-alert': 'error',
    'no-await-in-loop': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-nested-ternary': 'error',
    'no-only-tests/no-only-tests': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          /**
           * Use the ~ prefix instead. Example: "~server-backend/..."
           */
          '@app/*',
        ],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'IfStatement > :not(BlockStatement).consequent',
        message:
          'if statements without an explicit block statement as its body can be hard to read',
      },
      /**
       * The rest of these were copied from the eslint-config-airbnb-base rules since there is
       * currently no way to "extend" individual ESLint rules.
       */
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '"with" is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-return-assign': ['error', 'always'],
    'no-return-await': 'error',
    'no-shadow': 'off',
    'no-shadow-restricted-names': 'error',
    'no-underscore-dangle': [
      'error',
      { allow: ['_id', '__element', '__typename'] },
    ],
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 2,
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': [
      'error',
      'always',
      { avoidExplicitReturnArrows: true },
    ],
    'prefer-const': 'error',
    'prefer-destructuring': ['error'],
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    quotes: ['error', 'backtick', { avoidEscape: true }],
    radix: 'error',
    'react/destructuring-assignment': ['error', 'always'],
    'react/forbid-component-props': ['error', { forbid: ['style'] }],
    'react/forbid-dom-props': ['error', { forbid: ['style'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    // 'unicorn/better-regex': 2,
    // 'unicorn/catch-error-name': 2,
    // 'unicorn/consistent-function-scoping': 2,
    // 'unicorn/no-abusive-eslint-disable': 2,
    // 'unicorn/no-hex-escape': 2,
    // 'unicorn/no-typeof-undefined': 2,
    // 'unicorn/no-useless-promise-resolve-reject': 2,
    // 'unicorn/no-useless-spread': 2,
    // 'unicorn/numeric-separators-style': 2,
    // 'unicorn/prefer-array-flat-map': 2,
    // 'unicorn/prefer-array-index-of': 2,
    // 'unicorn/prefer-array-some': 2,
    // 'unicorn/prefer-at': 2,
    // 'unicorn/prefer-dom-node-append': 2,
    // 'unicorn/prefer-native-coercion-functions': 2,
    // 'unicorn/prefer-node-protocol': 2,
    // 'unicorn/prefer-number-properties': 2,
    // 'unicorn/prefer-optional-catch-binding': 2,
    // 'unicorn/prefer-set-size': 2,
    // 'unicorn/prefer-string-replace-all': 2,
    // 'unicorn/prefer-string-slice': 2,
    // 'unicorn/prefer-ternary': 2,
    // 'unicorn/prefer-top-level-await': 2,
    // 'unicorn/text-encoding-identifier-case': 2,
    yoda: 'error',
  },
};
