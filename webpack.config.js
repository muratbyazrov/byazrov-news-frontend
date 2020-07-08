// утилита, для понимания относит пути вебпаком
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin'); // для работы с html
const WebpackMd5Hash = require('webpack-md5-hash'); // хеширует и сравнивает хеш

module.exports = {
  // точка входа
  entry: { main: './src/index.js' },
  // точка выхода
  output: {
    // ссылка на текущую папку и относитльный путь к точке выхода(относительно текущей директории)
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/, // исключает папку node_modules
    },
    {
      test: /\.css$/, // применять это правило только к CSS-файлам
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], // к этим файлам нужно применить пакеты
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
  ],
};
