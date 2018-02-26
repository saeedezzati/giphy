// process.env.API_URL = 'localhost:8000';
const path = require('path');
var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');


// the clean options to use
// let cleanOptions = {
//   root:     '/full/webpack/root/path',
//   exclude:  ['shared.js'],
//   verbose:  true,
//   dry:      false
// }

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
    // publicPath: path.join(__dirname,'/build/'),
  },
  module: {
    rules: [
      {
        exclude: path.resolve(__dirname, "node_modules/"),
        test: /\.js$/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-1']
            }
          },
        ],  
      },
      {
        test: /\.(png|jp(e*)g|svg|ico|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // publicPath: 'assets/',
              name: '/[path][name].[ext]?[hash]',
            },
          }
        ]    
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  
  plugins: [
    new CleanWebpackPlugin(['build/*.js', 'build/*.map']),    
  ],
  
}

