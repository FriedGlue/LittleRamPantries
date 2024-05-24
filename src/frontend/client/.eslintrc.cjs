module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    // Add other custom rules as needed
  },
  settings: {
    tailwindcss: {
      // These are the default values but feel free to customize
      whitelist: [],
      config: 'tailwind.config.js',
      cssFiles: ['**/*.css', '**/*.scss'],
      removeDuplicates: true,
    },
  },
};
