const logProps = {
  isLoggedIn: localStorage.getItem('isloggedIn'),
  userName: localStorage.getItem('userName'),
  page: undefined,
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
    message: 'Пароль может содеражить только буквы и цифры',
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

module.exports = {
  emailRules, passwordRules, nameRules, logProps,
};
