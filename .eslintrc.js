module.exports = {
  root: true,
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "vueFeatures": {
      "filter": true,
      "interpolationAsNonHTML": false,
    }
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/multi-word-component-names': 'off', // 'error' | 'warn' | 'off'
    'no-console': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'warn',
    'arrow-parens': 'off',
    '@typescript-eslint/member-delimiter-style': 'warn'
  }
}