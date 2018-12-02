'use strict';

const path = require("path"),
  env = require("./env"),
  fs = require("fs"),
  webpack = require("webpack");

function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, './node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`;
      return externals
    }, {})
}


module.exports = {
  context: path.resolve(__dirname, "./"),
  entry: {
    server: './server.prod'
  },
  output: {
    path: path.join(__dirname, "/dist/server"),
    publicPath: '/bundle/',
    filename: '[name].js',
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: true
  },
  externals: getExternals(),
  resolve: {
    modulesDirectories: ['node_modules', 'vendor_modules', 'src'],
    extensions: ['', '.es', '.js'],
    alias: {}
  },
  module: {
    loaders: [
      {
        test: /.(es|js)$/, exclude: /node_modules|vendor_modules/,
        loader: "babel-loader",
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react'],
          cacheDirectory: true
        },
      },
      {test: /\.less$/, loader: "css!less"},
      {test: /\.scss$/, loader: "css!sass"},
      {test: /\.css$/, loader: "css"},
      {test: /\.yml$/, loader: 'json!yaml'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.(pdf|ico|docx)$/, loader: 'file?name=[name].[ext]'},
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)/,
        loader: 'url?limit=10000&name=[name]-[sha1:hash:base64:7].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      // 不起作用 'process.env.NODE_ENV': '"production-service"',
      // 不起作用 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      '__DEV__': false,
      '__WS_ROOT__': '"' + env.wsRoot + '"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    })
  ]
};
