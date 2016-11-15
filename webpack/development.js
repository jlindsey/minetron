/* eslint-disable max-len */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import StatsPlugin from 'stats-webpack-plugin';
import path from 'path';
import baseConfig from './base';

const port = 3308;

export default validate(merge(baseConfig, {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  target: 'electron-renderer',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './src/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  resolve: {
    root: [
      path.join(__dirname, '..', 'node_modules'),
      path.join(__dirname, '..', 'app', 'node_modules'),
      path.join(__dirname, '..', 'src')
    ]
  },

  plugins: [
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}));

