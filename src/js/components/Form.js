// библиотека валидации (По заданию можно пользоваться)
const approve = require('approvejs');

export default class Form {
  constructor(mainApi, popup, formParams, loginCheck) {
    this.mainApi = mainApi;
    this.popup = popup;
    this.signupSubmit = formParams.signupSubmit;
    this.loginSubmit = formParams.loginSubmit;
    this.loginEmail = formParams.loginEmail;
    this.loginPassword = formParams.loginPassword;
    this.signupName = formParams.signupName;
    this.signupEmail = formParams.signupEmail;
    this.signupPassword = formParams.signupPassword;
    this.emailRules = formParams.emailRules;
    this.passwordRules = formParams.passwordRules;
    this.nameRules = formParams.nameRules;
    this.loginServerError = formParams.loginServerError;
    this.signupServerError = formParams.signupServerError;
    this.loginForm = formParams.loginForm;
    this.signupForm = formParams.signupForm;
    this.loginCheck = loginCheck;
  }

  setServerLoginError(err) {
    err.text()
      .then((error) => JSON.parse(error).message)
      .then((errorMessage) => {
        this.loginServerError.textContent = errorMessage;
      });
  }

  setServerSignupError(err) {
    err.text()
      .then((error) => JSON.parse(error).message)
      .then((errorMessage) => {
        this.signupServerError.textContent = errorMessage;
      });
  }

  handlValidate(event) {
    this.validateInputElement(event.target);
    this.renderLoginForm();
    this.renderSignupForm();
    this.loginServerError.textContent = ''; // будет скрывать серверную ошибку
  }

  validateInputElement(element) {
    // валидирует переданный input
    let result;
    if (element.type === 'email') {
      result = approve.value(element.value, this.emailRules);
    } else if (element.type === 'password') {
      result = approve.value(element.value, this.passwordRules);
    } else if (element.type === 'text') {
      result = approve.value(element.value, this.nameRules);
    }
    this.activateError(result, element);
  }

  // Это функция добавляет определенный класс полю, чтобы тот приобрел новые стили
  // eslint-disable-next-line class-methods-use-this
  activateError(result, element) {
    const errorElement = document.getElementById(`error-${element.id}`);
    if (!result.approved) {
      errorElement.classList.add('input-container__invalid');
      // eslint-disable-next-line prefer-destructuring
      errorElement.textContent = result.errors[0];
    } else {
      errorElement.classList.remove('input-container__invalid');
    }
  }

  // кнопка формы логирования
  renderLoginForm() {
    if ((approve.value(this.loginEmail.value, this.emailRules)).approved
      && (approve.value(this.loginPassword.value, this.passwordRules)).approved) {
      this.loginSubmit.classList.add('popup__button_active');
      this.loginSubmit.removeAttribute('disabled');
    } else {
      this.loginSubmit.classList.remove('popup__button_active');
      this.loginSubmit.setAttribute('disabled', 'true');
    }
  }

  // кнопка формы регистрации
  renderSignupForm() {
    if ((approve.value(this.signupEmail.value, this.emailRules)).approved
      && (approve.value(this.signupPassword.value, this.passwordRules)).approved
      && (approve.value(this.signupName.value, this.nameRules)).approved) {
      this.signupSubmit.classList.add('popup__button_active');
      this.signupSubmit.removeAttribute('disabled');
    } else {
      this.signupSubmit.classList.remove('popup__button_active');
      this.signupSubmit.setAttribute('disabled', 'true');
    }
  }

  // авторизация...
  validateLoginForm(event) {
    event.preventDefault();
    this.mainApi.signin(this.loginEmail.value, this.loginPassword.value) // запрос данных польз.
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.ok) {
          this.loginCheck() // если ответ положительный, обновляем свойства logProps
            .then(() => {
              this.popup.closeLogin(); // закрываем форму
            })
            .then(() => {
              setTimeout(() => {
                window.location.reload(); // и перезапускаем страницу для обновления
              }, 500);
            });
        } else { return Promise.reject(res); } // в противном случае переходим в catch
      })
      .catch((err) => {
        this.setServerLoginError(err); // и уже здесь сообщаем об ошибке
      });
  }

  // регистрация...
  validateSignupForm(event) {
    event.preventDefault();
    this.mainApi.signup(this.signupEmail.value, this.signupPassword.value, this.signupName.value)
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.ok) {
          this.popup.openSuccess();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        this.setServerSignupError(err);
      });
  }

  // очистить поля формы логирования
  resetLoginForm() {
    this.loginForm.reset();
  }

  // очистить поля формы регистрации
  resetSignupForm() {
    this.signupForm.reset();
  }
}
