import { form } from '../../index';
import { signupSubmit, loginSubmit, loginEmail, loginPassword,
  loginForm, signupName, signupEmail, signupPassword, signupForm,
  emailRules, passwordRules, nameRules, } from '../constans/constans';

// библиотека валидации
const approve = require('approvejs');

export class Form {
  constructor() {
  }
  setServerError() {
    // добавляет форме ощибку с сервера
  }

  handlValidate(event) {
    form.validateInputElement(event.target)
    form.renderLoginForm();
    form.renderSignupForm();
  }

  validateInputElement(element) {
    // валидирует переданный input
    let result;
    if (element.type == 'email') {
      result = approve.value(element.value, emailRules);
    } else if (element.type == 'password') {
      result = approve.value(element.value, passwordRules);
    } else if (element.type == 'text') {
      result = approve.value(element.value, nameRules);
    }
    form.activateError(result, element);
  }

  //Это функция добавляет определенный класс полю, чтобы тот приобрел новые стили
  activateError(result, element) {
    const errorElement = document.getElementById(`error-${element.id}`);
    if (!result.approved) {
      errorElement.classList.add('input-container__invalid');
      errorElement.textContent = result.errors[0];
    } else {
      errorElement.classList.remove('input-container__invalid');
    }
  }

  // кнопка формы логирования
  renderLoginForm() {
    if ((approve.value(loginEmail.value, emailRules)).approved && (approve.value(loginPassword.value, passwordRules)).approved) {
      loginSubmit.classList.add('popup__button_active');
    } else {
      loginSubmit.classList.remove('popup__button_active');
    }
  }

  // кнопка формы регистрации
  renderSignupForm() {
    if ((approve.value(signupEmail.value, emailRules)).approved &&
    (approve.value(signupPassword.value, passwordRules)).approved &&
    (approve.value(signupName.value, nameRules)).approved) {
      signupSubmit.classList.add('popup__button_active');
    } else {
      signupSubmit.classList.remove('popup__button_active');
    }
  }

  // валидация всех полей по нажатию на кнопку сабмита
  validateLoginForm(event) {
    event.preventDefault();
    [loginEmail, loginPassword].forEach((elem) => {
      form.validateInputElement(elem)
    });
  }

  validateSignupForm(event) {
    event.preventDefault();
    [signupEmail, signupPassword, signupName].forEach((elem) => {
      form.validateInputElement(elem)
    });
  }

  // очистить поля формы логирования
  resetLoginForm() {
    loginForm.reset();
  }

  // очистить поля формы регистрации
  resetSignupForm() {
    signupForm.reset();
  }

  getIinfo() {
    // возвращает данные формы
  }
}

