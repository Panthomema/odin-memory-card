/** @type {import('lint-staged').Config} */
export default {
  '*.{js,ts,tsx}': ['eslint --fix'],
  '*.css': ['stylelint --fix'],
  '*.{js,ts,tsx,css,md,json}': ['prettier --write'],
};
