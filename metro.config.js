const { getDefaultConfig } = require('expo/metro-config'); // or require('metro-config') for bare RN

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// // New configuration for Lottie files
config.resolver.sourceExts.push('lottie'); // Add lottie to sourceExts


module.exports = config;
