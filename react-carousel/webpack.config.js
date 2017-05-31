const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: { 'index': './component/carousel' },
  output: {
    path: path.join(__dirname + '/dist/'),
    filename: '[name].min.js?[hash:8]',//[name].js
    chunkFilename: '[name].min.js?[chunkhash:8]',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,

      },
      {
        test: /\.less$/,
        use: ['style', 'css','less'],
      }
    ],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')// production | true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new HtmlWebpackPlugin({
      title: 'React 轮播演示',
      template: './template.html',
      keywords: 'React Carousel',
      description: 'React 轮播演示',
      inject: 'body',
      filename: './index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        sortAttributes: true,
        sortClassName: true
      },
      xhtml: true,
      hash: false
    })
  ],
};