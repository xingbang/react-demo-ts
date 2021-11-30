const { override, addLessLoader, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const WebpackBar = require('webpackbar');

module.exports = override(
  // 别名设置
  addWebpackAlias({
    '@src': path.resolve(__dirname, './src')
  }),
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]'
  }),
  addWebpackPlugin(new WebpackBar())
);
