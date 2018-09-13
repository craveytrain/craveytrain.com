module.exports = {
  'lint-staged': {
    linters: {
      '**/*.js': ['prettier-standard', 'git add']
    }
  }
}
