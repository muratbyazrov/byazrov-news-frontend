export class Header {
  constructor(color) {
    this.color = color;
  }

  render(props) {
    // в объекте props должны быть два своства: 1. isLoggedIn 2. userName
    if (props.isLoggedIn) {
      // если пользователь зареган, надо отобразить шапку как для зареганного пользователя
      // В частности отобразить в кнопке имя пользователя props.userName
    }
    // если пользователь не зареган, отобразить шапку для незареганного
  }
}
