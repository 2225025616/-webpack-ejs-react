'use strict';

var path = require("path");
var env = require("./env");
var _ = require("lodash");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyes-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({filename: "webpack-manifest.json", path: path.join(__dirname, "dist")});

function merge(defaultConfig, mergeConfig) {
  return _.merge(defaultConfig, mergeConfig, function (obj1, obj2) {
    return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
  });
}

var defaultConfig = {
  context: path.join(__dirname, "src"),
  entry: {
    "app": ["./app"],
    "template": ["./template"],
    "admin": ["./admin"],
    "mobile": ["./mobile"]
  },
  externals: {},
  resolve: {
    modulesDirectories: ['node_modules', 'vendor_modules', 'src'],
    extensions: ['', '.es', '.js'],
    alias: {}
  },
  module: {
    loaders: [
      {test: /\.yml$/, loader: 'json!yaml'},
      {test: /\.(pdf|ico|docx)$/, loader: 'file?name=[name].[ext]'},
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)/,
        loader: 'url?limit=10000&name=[name]-[sha1:hash:base64:7].[ext]'
      }],
      rules: [
        {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};

console.log(process.env.NODE_ENV, process.env.NODE_ENV === "production", typeof process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  module.exports = merge(defaultConfig, {
    output: {
      path: path.join(__dirname, "/dist/www/bundle"),
      publicPath: '/bundle/',
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkHash:5].chunk.js',
    },
    module: {
      loaders: [
        {
          test: /.es$/, exclude: /node_modules|vendor_modules/,
          loader: "babel-loader",
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['es2015', 'stage-0', 'react'],
            cacheDirectory: true
          }
        },
        {test: /\.less$/, loader: ExtractTextPlugin.extract("css!less")},
        {test: /\.scss$/, loader: ExtractTextPlugin.extract("css!sass")},
        {test: /\.css$/, loader: ExtractTextPlugin.extract("css")},
      ]
    },
    plugins: [
      new ExtractTextPlugin("[name]-[hash].css"),
      new webpack.optimize.CommonsChunkPlugin('common', 'common-[hash].js'),
      new webpack.optimize.DedupePlugin(),
      assetsPluginInstance,
      new webpack.DefinePlugin({
        // 不起作用 'process.env.NODE_ENV': '"production-service"',
        // 不起作用 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        '__DEV__': false,
        '__WS_ROOT__': '"' + env.wsRoot + '"'
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,  // remove all comments
          },
          compress: {
            warnings: false
          }
        }
      })
    ]
  });
} else {
  module.exports = merge(defaultConfig, {
    entry: {
      "app": ['webpack-hot-middleware/client?reload=true'],
      "template": ['webpack-hot-middleware/client?reload=true'],
      "mobile": ['webpack-hot-middleware/client?reload=true'],
    },
    devtool: 'source-map',
    cache: true,
    debug: true,
    outputPathinfo: true,
    output: {
      path: path.join(__dirname, "/dist/www/bundle"),
      publicPath: '/bundle/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    module: {
      loaders: [
        {
          test: /.es$/, exclude: /node_modules|vendor_modules/,
          loader: "babel-loader",
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
            cacheDirectory: true
          }
        },
        {test: /\.less$/, loader: ExtractTextPlugin.extract("css?sourceMap!less?sourceMap")},
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("css?sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true")
        },
        {test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
      ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css"),
      new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        '__DEV__': true,
        '__WS_ROOT__': '"' + env.wsRoot + '"'
      })
    ]
  });
}
