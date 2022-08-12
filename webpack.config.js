const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  
  devtool: 'inline-source-map',
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: path.resolve(__dirname, "node_modules"),
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node', // use require() & use NodeJs CommonJS style
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc. 
  },
  // devServer: {
  //   port: 8080,
  //   liveReload: true,
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};