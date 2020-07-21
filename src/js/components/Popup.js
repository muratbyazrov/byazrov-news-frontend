import { popupLogin, popupSignup, popupSuccess } from '../constans/constans';
import { form } from '../../index';

export class Popup {
  constructor(){
  }
  setContent(){
    // Попап - это общий контейнер для для всех форм. Этот метод должна всатвлять нунжную форму
  }
  clearContent() {
    // Эта функция очищает попап. Например, когда форма регистрации закрывается и появляется форма об успешной регистрации
  }
  openLogin() {
    popupSignup.classList.remove('popup_is-opened');
    form.resetLoginForm();
    form.renderLoginForm();
    popupLogin.classList.add('popup_is-opened');
  }
  closeLogin() {
    popupLogin.classList.remove('popup_is-opened');
  }
  openSignUp() {
    popupLogin.classList.remove('popup_is-opened');
    form.resetSignupForm();
    form.renderSignupForm();
    popupSignup.classList.add('popup_is-opened');
  }
  closeSignUp() {
    popupSignup.classList.remove('popup_is-opened');
  }
  openSuccess() {
    popupSignup.classList.remove('popup_is-opened');
    popupSuccess.classList.add('popup_is-opened');
  }
  closeSuccess() {
    popupSuccess.classList.remove('popup_is-opened');
  }
}

// ! НЕ знаю как обратиться к методу класса внутри класса. Узнать