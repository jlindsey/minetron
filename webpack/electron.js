// Build config for electron's Main Process file.

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import baseConfig from './base';

export default validate(merge(baseConfig, {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/main.development.js'],
  target: 'electron-main',

  output: {
    filename: 'main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  externals: [
    'font-awesome'
  ]
}));

