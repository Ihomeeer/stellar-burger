import { baseURL } from '../../utils/constants';
import { checkStatus } from '../../utils/checkStatus';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { refreshFetch } from '../../utils/refreshFetch';

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

export const SET_USER_STATE = "SET_USER_STATE";
export const DELETE_USER_STATE = "DELETE_USER_STATE";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const SESSION_TERMINATION_SUCCESS = "DELETE_USER_SUCCESS";
export const SESSION_TERMINATION_FAILURE = "DELETE_USER_FAILURE";
export const SET_SESSION_TERMINATION_STATE = "SET_DELETE_USER_STATE";
export const CLEAR_SESSION_TERMINATION_STATE = "CLEAR_DELETE_USER_STATE";


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
            setCookie('token', authToken);
            setCookie('refreshToken', refreshToken);
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
        }
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
  const token = getCookie('token');
  return function (dispatch) {
    refreshFetch(`${baseURL}/auth/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
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
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILURE,
          authError: err
        })
        console.log(err);
      })
  }
}

// изменение данных пользователя
export function updateUser(userData) {
  const token = getCookie('token');
  return function (dispatch) {
    refreshFetch(`${baseURL}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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