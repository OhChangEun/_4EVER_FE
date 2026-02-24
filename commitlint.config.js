module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // type + optional scope + subject (대/소문자, 한글, 특수문자 허용)
      headerPattern: /^(feat|fix|refac|test|chore|docs)(?:\(([a-zA-Z0-9_-]+)\))?: (.+)$/u,
      headerPatternFlags: 'u',
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-case': [2, 'always', 'lower-case'],
    'scope-case': [0],
    'subject-case': [0],
    'subject-max-length': [2, 'always', 50],
    'subject-full-stop': [2, 'never', '.'],
    'type-enum': [2, 'always', ['feat', 'fix', 'refac', 'test', 'chore', 'docs']],
  },
};
