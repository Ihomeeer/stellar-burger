import { baseURL } from '../../utils/constants';
import { checkStatus } from '../../utils/checkStatus';

export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILURE = 'USER_REGISTRATION_FAILURE';
export const SET_REGISTRATION_STATE = 'SET_REGISTRATION_STATE';
export const CLEAR_REGISTRATION_STATE = 'CLEAR_REGISTRATION_STATE';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const CLEAR_LOGIN_STATE = 'CLEAR_LOGIN_STATE';

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const SET_FORGOT_PASSWORD_STATE = 'SET_FORGOT_PASSWORD_STATE';
export const CLEAR_FORGOT_PASSWORD_STATE = 'CLEAR_FORGOT_PASSWORD_STATE';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const SET_RESET_PASSWORD_STATE = 'SET_RESET_PASSWORD_STATE';
export const CLEAR_RESET_PASSWORD_STATE = 'CLEAR_RESET_PASSWORD_STATE';

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
        console.log(err);
      })
  }
}

// логин существующего пользователя
export function login(email, password) {
  return function (dispatch) {
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
          dispatch({
            type: USER_LOGIN_SUCCESS,
            user: res.user,
            loginError: ""
          })
          dispatch({
            type: SET_LOGIN_STATE,
            login_success: true
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGIN_FAILURE,
          loginError: err
        })
        console.log(err);
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
        console.log('then')
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
        console.log('then')
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
        console.log(err);
      })
  }
}
