const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/app.ts",
    // constants: "./src/constants/constants.ts",
    // gameField: "./src/classes/game-field-class.ts",
    // gameInitBtn: "./src/classes/game-initialization-button-class.ts",
    // gameLocalStorage: "./src/classes/game-local-storage-class.ts",
    // gameMode: "./src/classes/game-mode-class.ts",
    // gameSymbols: "./src/classes/game-symbols-class.ts",
    // htmlGameField: "./src/classes/html-game-field-class.ts",
    // tictactoe: "./src/classes/tic-tac-toe-class.ts"
  devtool: 'inline-source-map',
  mode: "development",
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
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // use require() & use NodeJs CommonJS style
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    },
};