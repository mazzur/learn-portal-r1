const overrideSvgLoader = require('./override-svg-loader');

module.exports = (config) => {
  return overrideSvgLoader(config);
};
