const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const path = require('path'); // eslint-disable-line

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env) // eslint-disable-line

module.exports = ( { mode } = { mode: 'production', presets: [] }) => {
  console.log('>> env: ', mode);
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jp?g$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 5000
                }
              }
            ]
          },
          { 
            test: /\.html$/,
            exclude: [
              path.resolve(__dirname, 'src', 'index.html')
            ],
            loader: 'html-loader' 
          }
        ]
      },
      entry: './src/index.js',
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
        }),
        new webpack.ProgressPlugin(),
      ],
    },
    modeConfig(mode)
  );
};