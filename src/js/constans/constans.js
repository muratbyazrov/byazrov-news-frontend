const logProps = {
  isLoggedIn: localStorage.getItem('isloggedIn'),
  userName: localStorage.getItem('userName'),
  page: undefined,
  userId: localStorage.getItem('userId'),
};

// правила для валидации полей форм
const emailRules = {
  required: {
    required: true,
    message: 'Это обязательное поле',
  },
  email: {
    email: true,
    message: 'Неправильный формат email',
  },
};
const passwordRules = {
  required: {
    required: true,
    message: 'Это обязательное поле',
  },
  alphaNumeric: {
    alphaNumeric: true,
    message: 'Пароль может содеражить только латинские буквы и цифры',
  },
  min: {
    min: 8,
    message: 'Пароль должен содержать не менее 8 символов',
  },
};
const nameRules = {
  required: {
    required: true,
    message: 'Это обязательное поле',
  },
  min: {
    min: 2,
    message: 'Имя должно содержать не менее 2 символов',
  },
};

const topButton = document.querySelector('.top-button'); // кнопка для быстрого скролла наверх

// eslint-disable-next-line no-undef
const serverUrl = NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.byazrov-news.ga';

module.exports = {
  emailRules, passwordRules, nameRules, logProps, topButton, serverUrl,
};
