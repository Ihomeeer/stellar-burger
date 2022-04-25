import { checkStatus } from "./checkStatus";
import { baseURL } from "./constants";
import { getCookie, setCookie } from "./cookie";

// автопробрасывание рефреш-токена, если на запрос авторизации приходит ошибка 403
export const refreshFetch = (url, options = {}) => {
  return fetch(url, options)
    .then(res => checkStatus(res))
    .catch(async err => {
      // если в catch прилетает ошибка со статусом 403, то происходит POST-запрос с рефреш-токеном,
      // проверяется результат и при успехе в куки прописываются новые токен и рефреш-токен.
      // Затем в заголовки запроса прописывается обновленный свежий токен.
      if (err === 'Ошибка: 403') {
        await fetch(`${baseURL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie('token')}`
          },
          body: JSON.stringify({
            token: getCookie('refreshToken')
          }),
        })
          .then((res) => checkStatus(res))
          .then(res => {
            setCookie('token', res.accessToken.split('Bearer ')[1])
            setCookie('refreshToken', res.refreshToken)
          })
          .catch(err => new Error(err));
        options.headers.authorization = `Bearer ${getCookie('token')}`;
        const res = await fetch(url, options);
        return checkStatus(res)
      } else {
        return Promise.reject(err)
      }
    })
}