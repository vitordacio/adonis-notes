import { configApp } from '@adonisjs/eslint-config'
export default {
  ...configApp(),
  rules: {
    '@adonisjs/prefer-lazy-controller-import': 'off',
  },
}
