// утилита, для понимания относит пути вебпаком
const path = require('path');

module.exports = {
  // точка входа
  entry: { main: './src/index.js' },
  // точка выхода
  output: {
    // ссылка на текущую папку и относитльный путь к точке выхода(относительно текущей директории)
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
