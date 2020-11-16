/** @type {import('webpack').Configuration} */
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExcludeTagsPlugin = require('./html-webpack-exclude-tags-plugin');

const PROD = process.env.NODE_ENV === 'production';

const COMMON_NAME = 'TyGr Logo';

const common = {
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[contenthash].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  stats: 'minimal',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ExcludeTagsPlugin(),
  ],
};

// Main config: builds both the browser and node version
const main = merge(common, {
  entry: {
    node: './demo/node.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/template.html',
      filename: 'node.html',
      title: `${COMMON_NAME} Node Demo`,
      excludeSelector: '[browser]',
    }),

    // Browser config. Does not require its own webpack config object,
    // just copy the required files into the dist directory
    new HtmlWebpackPlugin({
      template: 'demo/template.html',
      filename: 'browser.html',
      title: `${COMMON_NAME} Browser Demo`,
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'template.html'), to: 'browser.html' },
        'lib/*.min.*',

        // Add index, which just redirects to node by default
        path.resolve(__dirname, 'index.html'),
      ],
    }),
  ],
});

const standalone = merge(common, {
  entry: {
    standalone: './demo/standalone.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/template.html',
      filename: 'standalone.html',
      title: `${COMMON_NAME} Standalone Demo`,
      excludeSelector: '[browser]',
    }),
  ],
});

const sass = merge(common, {
  entry: {
    sass: './demo/sass.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/template.html',
      filename: 'sass.html',
      title: `${COMMON_NAME} Sass Demo`,
      excludeSelector: '[browser]',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: PROD ? 'compressed' : 'expanded',
              },
            },
          },
        ],
      },
    ],
  },
});

module.exports = [main, standalone, sass];
