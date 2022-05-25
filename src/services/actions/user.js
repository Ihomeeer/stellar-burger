import { baseURL } from '../../utils/constants';
import { checkStatus } from '../../utils/checkStatus';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { refreshFetch } from '../../utils/refreshFetch';
import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  SET_REGISTRATION_STATE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_LOGIN_STATE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_FORGOT_PASSWORD_STATE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_RESET_PASSWORD_STATE,
  SET_USER_STATE,
  DELETE_USER_STATE,
  SET_USER_LOGGED_IN_STATE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SESSION_TERMINATION_SUCCESS,
  SESSION_TERMINATION_FAILURE,
  SET_SESSION_TERMINATION_STATE,
  SET_LOGGING_IN,
} from '../../utils/constants';


// регистрация нового пользователя
export function register(name, email, password) {
  return function (dispatch) {
    fetch(`${baseURL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_REGISTRATION_SUCCESS,
            registerError: ""
          })
          dispatch({
            type: SET_REGISTRATION_STATE,
            register_success: true
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_REGISTRATION_FAILURE,
          registerError: err
        })
        dispatch({
          type: SET_REGISTRATION_STATE,
          register_success: false
        })
        console.log(err);
      })
  }
}

// логин существующего пользователя
export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: SET_LOGGING_IN,
      loggingIn: true
    })
    fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          let authToken;
          let refreshToken;
          authToken = res.accessToken.split('Bearer ')[1];
          refreshToken = res.refreshToken;
          if (authToken && refreshToken) {
            setCookie('token', authToken, { path: '/' });
            setCookie('refreshToken', refreshToken, { path: '/' });
          }
          dispatch({
            type: USER_LOGIN_SUCCESS,
            user: res.user,
            loginError: ""
          })
          dispatch({
            type: SET_LOGIN_STATE,
            login_success: true
          })
          dispatch({
            type: SET_USER_LOGGED_IN_STATE,
            isLoggedIn: true
          })
        }
      })
      .then(() => {
        dispatch({
          type: SET_LOGGING_IN,
          loggingIn: false
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGIN_FAILURE,
          loginError: err
        })
        dispatch({
          type: SET_LOGIN_STATE,
          login_success: false
        })
        dispatch({
          type: SET_LOGGING_IN,
          loggingIn: false
        })
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: SET_LOGGING_IN,
          loggingIn: false
        })
      })
  }
}

// восстановление пароля существующего пользователя (отправка кода на мыло)
export function forgotPassword(email) {
  return function (dispatch) {
    fetch(`${baseURL}/password-reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            forgotPassowrdError: ""
          })
          dispatch({
            type: SET_FORGOT_PASSWORD_STATE,
            forgot_password_success: true
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          forgotPassowrdError: err
        })
        dispatch({
          type: SET_FORGOT_PASSWORD_STATE,
          forgot_password_success: false
        })
        console.log(err);
      })
  }
}

// восстановление пароля существующего пользователя (отправка нового пароля и кода из письма)
export function resetPassword(password, token) {
  return function (dispatch) {
    fetch(`${baseURL}/password-reset/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "password": password,
        "token": token
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            resetPassowrdError: ""
          })
          dispatch({
            type: SET_RESET_PASSWORD_STATE,
            reset_password_success: true
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          resetPassowrdError: err
        })
        dispatch({
          type: SET_RESET_PASSWORD_STATE,
          reset_password_success: false
        })
        console.log(err);
      })
  }
}

// авторизация пользователя
export function getUser() {
  return function (dispatch) {
    dispatch({
      type: SET_LOGGING_IN,
      loggingIn: true
    })
    refreshFetch(`${baseURL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`
      },
    })
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          authError: ""
        })
        dispatch({
          type: SET_USER_STATE,
          user: res.user
        })
        dispatch({
          type: SET_USER_LOGGED_IN_STATE,
          isLoggedIn: true
        })

      })
      .then(() => {
        dispatch({
          type: SET_LOGGING_IN,
          loggingIn: false
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILURE,
          authError: err
        })
        dispatch({
          type: SET_USER_LOGGED_IN_STATE,
          isLoggedIn: false
        })
        dispatch({
          type: SET_LOGGING_IN,
          loggingIn: false
        })
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: SET_LOGGING_IN,
          loggingIn: false
        })
      })
  }
}

// изменение данных пользователя
export function updateUser(userData) {
  return function (dispatch) {
    refreshFetch(`${baseURL}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": userData?.name,
        "email": userData?.email
      }),
    })
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          updateError: ""
        })
        dispatch({
          type: SET_USER_STATE,
          user: res.user
        })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILURE,
          updateError: err
        })
        console.log(err);
      })
  }
}

// завершение сеанса пользователя
export const deleteUser = () => {
  const refreshToken = getCookie('refreshToken');
  return function (dispatch) {
    fetch(`${baseURL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SESSION_TERMINATION_SUCCESS,
            deleteUserError: ""
          })
          dispatch({
            type: DELETE_USER_STATE,
            user: {}
          })
          dispatch({
            type: SET_SESSION_TERMINATION_STATE,
            delete_user_success: true
          })
          dispatch({
            type: SET_USER_LOGGED_IN_STATE,
            isLoggedIn: false
          })
          deleteCookie('token');
          deleteCookie('refreshToken');
        }
      })
      .catch((err) => {
        dispatch({
          type: SESSION_TERMINATION_FAILURE,
          deleteUserError: err
        })
        dispatch({
          type: SET_SESSION_TERMINATION_STATE,
          delete_user_success: false
        })
        console.log(err);
      })
  }
}
