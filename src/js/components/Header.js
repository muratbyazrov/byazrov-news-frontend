import { savedArticlesButton, autorizButton, userNameButton, } from '../constans/constans';

export class Header {
  constructor(logProps) {
    // this.color = color;
    this.logProps = logProps;
  }

  render(logProps) {
    // в объекте props должны быть два свойства: 1. isLoggedIn 2. userName
    if (logProps.isLoggedIn) {
      savedArticlesButton.classList.add('display');
      userNameButton.value = logProps.userName;
      userNameButton.classList.remove('none-display');
      autorizButton.classList.add('none-display');
    } else {
      savedArticlesButton.classList.remove('display');
      userNameButton.classList.add('none-display');
      autorizButton.classList.remove('none-display');
    }
  }
}
