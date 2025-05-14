// next.config.js
const path = require('path');

module.exports = {
  // … any other Next.js config …
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
