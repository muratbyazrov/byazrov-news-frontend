import { popupLogin, popupSignup, popupSuccess } from '../constans/constans';

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
    popupLogin.classList.add('popup_is-opened');
  }

  closeLogin() {
    popupLogin.classList.remove('popup_is-opened');
  }

  openSignUp() {
    popupLogin.classList.remove('popup_is-opened');
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