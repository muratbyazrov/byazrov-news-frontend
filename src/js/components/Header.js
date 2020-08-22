export default class Header {
  constructor(headerObj, headerButton) {
    this.headerButton = headerButton;
    this.authorizButton = headerObj.authorizButton; // кнопка авторизации
    this.headerMenu = headerObj.headerMenu; // само выпадающее меню
    this.savedArticlesButton = headerObj.savedArticlesButton; // кнопка сохр статьи
    this.menuOpener = headerObj.menuOpener; // кнопка выпадающего меню
  }

  render(logProps) {
    // в объекте props должны быть два свойства: 1. isLoggedIn 2. userName
    if (logProps.isLoggedIn === 'true') {
      this.savedArticlesButton.classList.add('display');
      this.headerButton.value = `${logProps.userName}`;
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

  menuOpen() { // открыть меню
    this.headerMenu.classList.toggle('display');
    this.menuOpener.classList.toggle('header__menu-closer'); // поменять стиль кнопки
  }

  menuClose(event) { // закрыть меню
    if (!event.target.classList.contains('header__menu-opener')) {
      this.headerMenu.classList.remove('display');
      this.menuOpener.classList.remove('header__menu-closer'); // поменять стиль кнопки на исходный
    }
  }
}
