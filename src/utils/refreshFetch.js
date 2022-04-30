import { checkStatus } from "./checkStatus";
import { baseURL } from "./constants";
import { deleteCookie, getCookie, setCookie } from "./cookie";

const refreshToken = () => {
  return fetch(`${baseURL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
    .then((res) => checkStatus(res))
}

// автопробрасывание рефреш-токена, если на запрос авторизации приходит ошибка 403
export const refreshFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    return await checkStatus(res);
  } catch (err) {
    console.log(err)
    if (err === 'Ошибка 403. У вас недостаточно прав для просмотра содержимого') {
      const refreshData = await refreshToken();
      setCookie('token', refreshData.accessToken.split('Bearer ')[1]);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options)
      return await checkStatus(res);
    } else {
      return Promise.reject(err)
    }
  }
}



// export const refreshFetch = (url, options = {}) => {
//   return fetch(url, options)
//     .then(res => checkStatus(res))
//     .catch(async err => {
//       console.log('catch в в утилсах')
//       // если в catch прилетает ошибка со статусом 403, то происходит POST-запрос с рефреш-токеном,
//       // проверяется результат и при успехе в куки прописываются новые токен и рефреш-токен.
//       // Затем в заголовки запроса прописывается обновленный свежий токен.
//       if (err === 'Ошибка 403. У вас недостаточно прав для просмотра содержимого') {
//         await fetch(`${baseURL}/auth/token`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${getCookie('token')}`
//           },
//           body: JSON.stringify({
//             token: getCookie('refreshToken')
//           }),
//         })
//           .then((res) => checkStatus(res))
//           .then(res => {
//             console.log('обновились токены')
//             setCookie('token', res.accessToken.split('Bearer ')[1])
//             setCookie('refreshToken', res.refreshToken)
//           })
//           .catch(err => new Error(err));
//         options.headers.authorization = `Bearer ${getCookie('token')}`;
//         await fetch(url, options);
//       } else {
//         console.log('реджект в утилсах')
//         return Promise.reject(err)
//       }
//     })
// }