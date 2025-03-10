const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix --max-warnings=0'],
  '*.{json,md,yml,yaml}': 'prettier --write',
};

export default lintStagedConfig;