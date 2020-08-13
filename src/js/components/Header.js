export default class Header {
  constructor(headerObj, headerButton) {
    this.headerButton = headerButton;
    this.authorizButton = headerObj.authorizButton;
    this.headerMenu = headerObj.headerMenu;
    this.savedArticlesButton = headerObj.savedArticlesButton;
  }

  render(logProps) {
    // в объекте props должны быть два свойства: 1. isLoggedIn 2. userName
    if (logProps.isLoggedIn === 'true') {
      this.savedArticlesButton.classList.add('display');
      this.headerButton.value = logProps.userName;
      this.headerButton.classList.remove('none-display');
      this.hiddenAuthorizButton();
    } else if (logProps.isLoggedIn === 'false') {
      this.savedArticlesButton.classList.remove('display');
      this.headerButton.classList.add('none-display');
      this.authorizButton.classList.remove('none-display');
    }
  }

  // чтобы не возникало ошибки в консоли, когда кнопки автооризации не существует в сохраненках
  hiddenAuthorizButton() {
    if (this.authorizButton) {
      this.authorizButton.classList.add('none-display');
    }
  }

  menuOpen(event) {
    this.headerMenu.classList.toggle('display');
    event.target.classList.toggle('header__menu-closer');
  }
}
