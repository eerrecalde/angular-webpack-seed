const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function (options) {
  const entry = {
    main: './src/index',
  };

  const defaultLoaders = [
    { test: /\.json5$/, use: ['json5-loader'] },
    { test: /\.txt$/, use: ['raw-loader'] },
    { test: /\.html$/, use: ['html-loader'] },
  ];

  // var publicPath = options.devServer
  //   ? 'http://localhost:2992/assets/'
  //   : '/assets/';
  const publicPath = '/_assets/';

  const output = {
    path: path.join(__dirname, 'public', '_assets'),
    publicPath,
    filename: `[name].js${(options.longTermCaching ? '?[chunkhash]' : '')}`,
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    pathinfo: options.debug,
    library: 'libEmi',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  };
  const excludeFromStats = [
    /node_modules[\\/]angular[\\/]/,
  ];
  const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    function statsPlugin() {
      this.plugin('done', (stats) => {
        const jsonStats = stats.toJson({
          chunkModules: true,
          exclude: excludeFromStats,
        });
        jsonStats.publicPath = publicPath;
        if (!options.prerender) {
          fs.writeFileSync(path.join(__dirname, 'build', 'stats.json'), JSON.stringify(jsonStats));
        } else {
          fs.writeFileSync(path.join(__dirname, 'build', 'server', 'stats.json'), JSON.stringify(jsonStats));
        }
      });
    },
  ];

  const alias = {};
  const externals = ['angular'];

  if (options.commonsChunk && !options.cover) {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin(
        'commons',
        `commons.js${(options.longTermCaching ? '?[chunkhash]' : '')}`
      )
    );
  }

  const definitions = {
    'process.env.NODE_ENV': options.debug ? JSON.stringify('development') : JSON.stringify('production'),
  };

  if (options.minimize) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        // todo: check if needed
        sourceMap: true,
        compress: {
          warnings: false,
        },
      }),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }

  plugins.push(
    new webpack.DefinePlugin(definitions)
  );

  let jsRules;

  if (options.cover) {
    jsRules = [
      // transpile all files except testing sources with babel as usual
      {
        test: /\.test\.jsx?$/,
        exclude: /node_modules/,
        use: ['ng-annotate-loader', 'babel-loader'],
      },
      // transpile and instrument only testing sources with babel-istanbul
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          /\.test\./,
        ],
        use: ['istanbul-instrumenter-loader', 'ng-annotate-loader', 'babel-loader'],
      },
    ];
  } else {
    jsRules = [
      {
        test: /\.jsx?$/,
        use: [
          'ng-annotate-loader',
          'babel-loader',
          //'eslint-loader'
        ],
        exclude: /node_modules/,
      },
    ];
  }

  return {
    entry,
    output,
    target: 'web',
    module: {
      rules: []
        .concat(jsRules)
        .concat(defaultLoaders),
    },
    devtool: options.devtool,
    externals,
    resolve: {
      modules: [
        'web_modules',
        'node_modules',
      ],
      extensions: ['.web.js', '.js', '.jsx'],
      mainFields: ['browser', 'module', 'jsnext:main', 'main'],
      alias,
    },
    plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats,
      },
    },
  };
};
