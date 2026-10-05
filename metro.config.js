const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  buffer: path.resolve(__dirname, 'buffer-shim.js'),
};

module.exports = config;
