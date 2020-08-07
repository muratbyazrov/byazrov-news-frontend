import { savedArticlesButton} from '../constans/constans';

export class Header {
  constructor(headerButton, authorizButton) {
    this.headerButton = headerButton;
    this.authorizButton = authorizButton;
  }

  render(logProps) {
    // в объекте props должны быть два свойства: 1. isLoggedIn 2. userName
    if (logProps.isLoggedIn === 'true') {
      savedArticlesButton.classList.add('display');
      this.headerButton.value = logProps.userName;
      this.headerButton.classList.remove('none-display');
      this.hiddenAuthorizButton();
    } else if (logProps.isLoggedIn === 'false') {
      savedArticlesButton.classList.remove('display');
      this.headerButton.classList.add('none-display');
      this.authorizButton.classList.remove('none-display');
    }
  }

  hiddenAuthorizButton () {
    if(this.authorizButton) {
      this.authorizButton.classList.add('none-display');
    }
  }
}
