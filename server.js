/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from './webpack/development';

const app = express();
const compiler = webpack(config);
const PORT = 3308;

const wdm = devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
});

app.use(wdm);
app.use(hotMiddleware(compiler));

let server;

process.on('SIGERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => process.exit(0));
});

server = app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening on http://localhost:${PORT}`);
});

