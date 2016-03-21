var minimize = process.argv.indexOf('--minimize') !== -1,
    webpack = require('webpack'),
    plugins = [];

if(process.env.ENV === 'release' || minimize) plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = {
  entry: "./index",
  output: {
    path: __dirname + "/../public", publicPath: '/../public', filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
    }]
  }
};