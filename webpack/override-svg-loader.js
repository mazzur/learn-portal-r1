const path = require('path');

/**
 * In order to override the loader used for svgs,
 * target files should be excluded from the default rule and the new rule applied
 */

module.exports = (config) => {
  const predefinedRuleForSvgs = config.module.rules.find(({ test }) => test.test('icon.svg'));

  if (predefinedRuleForSvgs) {
    predefinedRuleForSvgs.exclude = path.resolve(__dirname, '../src/assets/svgs');
  } else {
    throw new Error(`
      Angular webpack configuration has been changed. It might break svg sprites loading.
      Please adjust the rules at ${path.resolve(__dirname, __filename)}
    `);
  }
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    },
  ];

  return config;
}
