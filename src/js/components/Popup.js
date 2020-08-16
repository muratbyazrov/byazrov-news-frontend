export default class Popup {
  constructor(popupObj) {
    this.popupLogin = popupObj.popupLogin;
    this.popupSignup = popupObj.popupSignup;
    this.popupSuccess = popupObj.popupSuccess;
    this.loginServerError = popupObj.loginServerError;
    this.signupServerError = popupObj.signupServerError;
  }

  openLogin() {
    this.closeSignUp();
    this.closeSuccess();
    /*     form.resetLoginForm();
    form.renderLoginForm(); */
    this.popupLogin.classList.add('popup_is-opened');
  }

  closeLogin() {
    this.popupLogin.classList.remove('popup_is-opened');
    this.loginServerError.textContent = '';
  }

  openSignUp() {
    this.closeLogin();
    /*     form.resetSignupForm();
    form.renderSignupForm(); */
    this.popupSignup.classList.add('popup_is-opened');
  }

  closeSignUp() {
    this.popupSignup.classList.remove('popup_is-opened');
    this.signupServerError.textContent = '';
  }

  openSuccess() {
    this.closeSignUp();
    this.popupSuccess.classList.add('popup_is-opened');
  }

  closeSuccess() {
    this.popupSuccess.classList.remove('popup_is-opened');
  }
}
