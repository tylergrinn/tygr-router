require('dotenv/config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const jsonImporter = require('node-sass-json-importer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';
const { GITHUB_PAGES, HTTP_SERVER } = process.env;

const HTML_FILENAME =
  PROD && (GITHUB_PAGES || HTTP_SERVER) ? '404.html' : 'index.html';

module.exports = {
  entry: path.resolve(__dirname, 'index.tsx'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  mode: PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: jsonImporter(),
                outputStyle: PROD ? 'compressed' : 'expanded',
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.css', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: HTML_FILENAME,
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
