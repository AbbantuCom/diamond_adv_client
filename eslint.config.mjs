import next from 'eslint-config-next';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'legacy/**'] },
  ...next,
];

export default eslintConfig;
