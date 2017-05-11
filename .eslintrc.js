module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    "eslint:recommended",
    "standard"
  ],
  "rules": {
    "arrow-parens": "off",
    "camelcase": "off",
    "comma-dangle": "off",
    "func-call-spacing": "off",
    "generator-star-spacing": "off",
    "key-spacing": ["error", { beforeColon: true, afterColon: true, align: "colon" }],
    "new-cap": "off",
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-multi-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-return-assign": "off",
    "no-sequences": "off",
    "no-template-curly-in-string": "off",
    "no-whitespace-before-property": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "quotes": "off",
    "spaced-comment": "off",
    "standard/object-curly-even-spacing": "off",
  },

  "globals": {
    // "showdown": false,
  },
}
