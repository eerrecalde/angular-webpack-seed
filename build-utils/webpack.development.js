const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ],
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
});