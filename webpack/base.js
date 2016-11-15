import path from 'path';
import validate from 'webpack-validator';

export default validate({
  context: path.join(__dirname, '..'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app', 'out'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [],

  externals: [
    'sqlite3'
  ]
});

