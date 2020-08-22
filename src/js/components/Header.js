export default class Header {
  constructor(headerParams, headerButton) {
    this.headerButton = headerButton;
    this.authorizButton = headerParams.authorizButton; // кнопка авторизации
    this.headerMenu = headerParams.headerMenu; // само выпадающее меню
    this.savedArticlesButton = headerParams.savedArticlesButton; // кнопка сохр статьи
    this.menuOpener = headerParams.menuOpener; // кнопка выпадающего меню
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

  menuOpen(event) { // открыть меню
    this.headerMenu.classList.toggle('display');
    event.target.classList.toggle('header__menu-closer'); // поменять стиль кнопки
  }

  menuClose(event) { // закрыть меню только если он вообще открыт
    if (!event.target.classList.contains('header__menu-opener') && this.headerMenu.classList.contains('display')) {
      this.headerMenu.classList.remove('display');
      this.menuOpener.classList.remove('header__menu-closer'); // поменять стиль кнопки на исходный
    }
  }
}
