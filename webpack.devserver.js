const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'static'),
    },
    compress: true,
    port: 9000,
    mode: 'development',
  },
};
