import { logProps } from '../constans/constans';
import { header, mainApi } from '../../index';

// установить параметры объекта из локал сторидж
function setLogProps() {
  logProps.isLoggedIn = localStorage.getItem('isloggedIn');
  logProps.userName = localStorage.getItem('userName');
}

// проверяем, зарегистирован ли пользователь
export function loginCheck() {
  // если запрос на получение данных пользователя...
  mainApi.getUserData()
    // правильный, то меням свойства объекта logProps на соответствующие
    .then((res) => {
      if (res.ok) {
        res.json()
          .then((data) => {
            localStorage.setItem('isloggedIn', true);
            localStorage.setItem('userName', data.data.name);
            localStorage.setItem('userId', data.data._id);
            setLogProps();
            header.render(logProps);
          });
        // если нет, так же меням свойства объекта logProps на соответствующие
      } else {
        localStorage.setItem('isloggedIn', false);
        localStorage.setItem('userName', undefined);
        setLogProps();
        header.render(logProps);
      }
    });
}

// функция выхода из аккаунта
export function signout() {
  mainApi.signout()
    // если ошибок не возникает, меням свойства объекта logProps на соответствующие
    .then((res) => {
      if (logProps.page === 'saved') {
        document.location.href = 'index.html';
      }
      if (res.ok) {
        localStorage.setItem('isloggedIn', false);
        localStorage.setItem('userName', undefined);
        setLogProps();
        header.render(logProps);
      }
    })
    .catch(() => {
      console.log('ошибка при выходе из аккаунта');
    });
}
