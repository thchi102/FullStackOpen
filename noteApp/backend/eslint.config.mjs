import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended, //Use ESLint's recommended settings
  {
    files: ['**/*.js'], //Files to check
    languageOptions: {
      sourceType: 'commonjs', //Language feature to expect
      globals: { ...globals.node }, //Include global variables defined in globals.node
      ecmaVersion: 'latest', //understand and lint the latest features
    },
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    rules: { 
      // '@stylistic/js/indent': ['error', 4],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'eqeqeq': 'error', // check if equality is checked with anything but ===
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off', // disable use of console. allow use of console.log
    }, 
  },
  {
    ignores: ['dist/**']
  }
]
