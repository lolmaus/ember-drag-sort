module.exports = {
  root          : true,
  parserOptions : {
    ecmaVersion : 2017,
    sourceType  : 'module',
  },
  plugins : [
    'align-assignments',
    'ember',
    'varspacing',
  ],
  extends : [
    'eslint:recommended',
    'plugin:ember/recommended',
    'standard',
    'plugin:varspacing/recommended',
  ],
  env : {
    browser : true,
  },
  rules : {
    'align-assignments/align-assignments' : 'error',
    'arrow-parens'                        : 'off',
    'camelcase'                           : 'off',
    'comma-dangle'                        : ['error', 'always-multiline'],
    'func-call-spacing'                   : 'off',
    'generator-star-spacing'              : 'off',
    'indent'                              : ['error', 2, {flatTernaryExpressions : true}],
    'key-spacing'                         : ['error', { beforeColon : true, afterColon : true, align : 'colon' }],
    'new-cap'                             : 'off',
    'no-console'                          : 'off',
    'no-mixed-operators'                  : 'off',
    'no-multi-spaces'                     : 'off',
    'no-multiple-empty-lines'             : 'off',
    'no-return-assign'                    : 'off',
    'no-sequences'                        : 'off',
    'no-template-curly-in-string'         : 'off',
    'no-whitespace-before-property'       : 'off',
    'object-curly-spacing'                : 'off',
    'operator-linebreak'                  : 'off',
    'padded-blocks'                       : 'off',
    'quote-props'                         : ['error', 'consistent-as-needed'],
    'quotes'                              : ['error', 'single'],
    'spaced-comment'                      : 'off',
    'standard/object-curly-even-spacing'  : 'off',
  },
  overrides : [
    // node files
    {
      files : [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles : [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
        'tests/pages/**',
      ],
      parserOptions : {
        sourceType  : 'script',
        ecmaVersion : 2015,
      },
      env : {
        browser : false,
        node    : true,
      },
      plugins : ['node'],
      rules   : Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      }),
    },

    // tests
    {
      files : [
        'tests/**/*.js',
      ],
      rules : {
        'no-unused-expressions' : 'off',
      },
    },
  ],
}
