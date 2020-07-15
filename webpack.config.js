// утилита, для понимания относит пути вебпаком
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin'); // для работы с html
const WebpackMd5Hash = require('webpack-md5-hash'); // хеширует и сравнивает хеш
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// создаем переменную для development-сборки
const isDev = process.env.NODE_ENV === 'development';

// чтобы переменные окружения работали на всех ОС (включ. Win)
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
    rules: [
      { // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/, // исключает папку node_modules
      },

      {
        test: /\.css$/i,
        use: [
        // если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
        // указали папку, куда складывать изображения
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: false,
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },

    ],
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }), // подключите плагин после MiniCssExtractPlugin

    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/saved.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'saved.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),

    new WebpackMd5Hash(),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),

  ],
};
