import { logProps, topButton } from '../constans/constans';
import MainApi from '../api/MainApi';

export const mainApi = new MainApi();

// установить параметры объекта из локал сторидж
function setLogProps() {
  logProps.isLoggedIn = localStorage.getItem('isloggedIn');
  logProps.userName = localStorage.getItem('userName');
}

export async function loginCheck() { // проверяем, зарегистирован ли пользователь
  mainApi.getUserData() // если запрос на получение данных пользователя...
    .then((res) => { // правильный, то меням свойства объекта logProps на соответствующие
      if (res.ok) {
        res.json()
          .then((data) => {
            localStorage.setItem('isloggedIn', true);
            localStorage.setItem('userName', data.data.name);
            localStorage.setItem('userId', data.data._id);
            setLogProps();
            console.log(logProps);
          });
      } else { // если нет, так же меням свойства объекта logProps на соответствующие
        localStorage.setItem('isloggedIn', false);
        localStorage.setItem('userName', undefined);
        setLogProps();
        console.log(logProps);
      }
    })
    .catch(() => {
      console.log('Ошибка предварительной авторизации');
    });
}

// функция выхода из аккаунта
export function signout() {
  mainApi.signout()
    .then((res) => { // если ошибок не возникает, меням свойства объекта logProps на соответствующие
      if (logProps.page === 'saved') {
        document.location.href = 'index.html';
      }
      if (res.ok) {
        localStorage.setItem('isloggedIn', false);
        localStorage.setItem('userName', undefined);
        setLogProps();
        window.location.reload();
      }
    })
    .catch(() => {
      console.log('ошибка при выходе из аккаунта');
    });
}

// функция для кнопки top
export function renderTopButton() {
  if (scrollY <= 1400) {
    topButton.style.opacity = 0;
  } else {
    topButton.style.opacity = 0.8;
  }
}
