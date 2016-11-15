// Wrapper for eslint, which doesn't support ES6 syntax.
require('babel-register');
module.exports = require('./development');

