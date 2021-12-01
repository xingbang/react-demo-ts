const { override, addLessLoader, addWebpackAlias, addWebpackPlugin, addWebpackModuleRule } = require('customize-cra');
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
  addWebpackModuleRule({
    test: /\.svg$/,
    use: [
      { loader: 'svg-sprite-loader', options: {} },
      { loader: 'svgo-loader', options: { removeAttrs: { attrs: 'fill' } } }
    ]
  }),
  addWebpackPlugin(new WebpackBar())
);
