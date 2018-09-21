const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line
const path = require('path'); // eslint-disable-line

module.exports = () => ({
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Production',
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin()
  ]
});