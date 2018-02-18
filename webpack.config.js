const path = require('path');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEVELOPMENT || false)),
  __PROD__: JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || false)),
});

module.exports = {
  entry: {
    main: './src/main.js',
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    contentBase: path.resolve(__dirname, '.tmp/dist'),
    hotOnly: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader!eslint-loader',
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader!eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(yaml|yml)$/,
        loader: ['json-loader', 'yaml-loader'],
      },
    ],
  },

  output: {
    publicPath: 'http://localhost:8080/',
    path: path.resolve(__dirname, '.tmp/dist'),
    filename: 'javascripts/[name].js',
  },

  plugins: [
    definePlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
