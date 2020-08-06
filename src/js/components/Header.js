import { savedArticlesButton, autorizButton, userNameButton, } from '../constans/constans';
const userNameButtonSaved = document.getElementById('user-name-button-saved');

export class Header {
  constructor() {
  }

  render(logProps) {
    // в объекте props должны быть два свойства: 1. isLoggedIn 2. userName
    if (logProps.isLoggedIn === 'true') {
      savedArticlesButton.classList.add('display');
      userNameButton.value = logProps.userName;
      userNameButtonSaved.value = logProps.userName;
      userNameButton.classList.remove('none-display');
      autorizButton.classList.add('none-display');
    } else if (logProps.isLoggedIn === 'false') {
      savedArticlesButton.classList.remove('display');
      userNameButton.classList.add('none-display');
      autorizButton.classList.remove('none-display');
    }
  }
}
