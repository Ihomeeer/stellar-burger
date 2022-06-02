import { checkStatus } from '../../utils/checkStatus';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { refreshFetch } from '../../utils/refreshFetch';
import { AppDispatch, AppThunk } from '../../utils/types/types';
import {
  IUserRegistrationSuccess,
  ISetRegistrationState,
  IUserRegistrationFailure,
  ISetLoggingIn,
  IUserLoginSuccess,
  IUserLoginFailure,
  ISetLoginState,
  ISetUserLoggedInState,
  IForgotPasswordSuccess,
  IForgotPasswordState,
  IForgotPasswordFailure,
  IResetPasswordSuccess,
  IResetPasswordState,
  IResetPasswordFailure,
  IGetUserSuccess,
  ISetUserState,
  IGetUserFailure,
  IUpdateUserSuccess,
  IUpdateUserFailure,
  ISessionTerminationSuccess,
  IDeleteUserState,
  ISetSessionTerminationState,
  ISessionTerminationFailure,
  IClearRegistrationState,
  IClearForgotPasswordState,
  IClearResetPasswordState,
  IClearSessionTerminationState,
  TUser,
  TRegister,
  TLogin,
  TForgotPassword,
  TResetPassword,
  TUpdateUser,
} from '../../utils/types/actions/userTypes';
import {
  baseURL,
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
  CLEAR_REGISTRATION_STATE,
  CLEAR_FORGOT_PASSWORD_STATE,
  CLEAR_RESET_PASSWORD_STATE,
  CLEAR_SESSION_TERMINATION_STATE
} from '../../utils/constants';

// регистрация
const userRegistrationSuccessAction = (): IUserRegistrationSuccess => ({
  type: USER_REGISTRATION_SUCCESS,
  registerError: ""
});

const setRegistrationStateAction = (state: boolean): ISetRegistrationState => ({
  type: SET_REGISTRATION_STATE,
  register_success: state
});

const userRegistrationFailureAction = (error: Promise<Error>): IUserRegistrationFailure => ({
  type: USER_REGISTRATION_FAILURE,
  registerError: error
});

// логин
const setLoggingInAction = (state: boolean): ISetLoggingIn => ({
  type: SET_LOGGING_IN,
  loggingIn: state
});

const userLoginSuccessAction = (data: TUser): IUserLoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  user: data,
  loginError: ""
});

const userLoginFailureAction = (error: Promise<Error>): IUserLoginFailure => ({
  type: USER_LOGIN_FAILURE,
  loginError: error
});

const setLoginStateAction = (state: boolean): ISetLoginState => ({
  type: SET_LOGIN_STATE,
  login_success: state
});

const setUserLoggedInStateAction = (state: boolean): ISetUserLoggedInState => ({
  type: SET_USER_LOGGED_IN_STATE,
  isLoggedIn: state
});

// забывание пароля
const forgotPasswordSuccessAction = (): IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
  error: ""
});

const setForgotPasswordStateAction = (state: boolean): IForgotPasswordState => ({
  type: SET_FORGOT_PASSWORD_STATE,
  forgot_password_success: state
});

const forgotPasswordFailureAction = (error: Promise<Error>): IForgotPasswordFailure => ({
  type: FORGOT_PASSWORD_FAILURE,
  error: error
});

// восстановление пароля
const resetPasswordSuccessAction = (): IResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
  resetPassowrdError: ""
});

const resetPasswordFailureAction = (error: Promise<Error>): IResetPasswordFailure => ({
  type: RESET_PASSWORD_FAILURE,
  resetPassowrdError: error
});

const setResetPasswordStateAction = (state: boolean): IResetPasswordState => ({
  type: SET_RESET_PASSWORD_STATE,
  reset_password_success: state
});


// авторизация пользователя, работа с флагом LoggingIn, чтобы ProtectedRoute нормально все отрисовывал, дичь всякая, в общем
const getUserSuccessAction = (): IGetUserSuccess => ({
  type: GET_USER_SUCCESS,
  authError: ""
});

const getUserFailureAction = (error: Promise<Error>): IGetUserFailure => ({
  type: GET_USER_FAILURE,
  authError: error
});

const setUserStateAction = (data: TUser): ISetUserState => ({
  type: SET_USER_STATE,
  user: data
});

// изменение данных пользователя
const updateUserSuccessAction = (): IUpdateUserSuccess => ({
  type: UPDATE_USER_SUCCESS,
  updateError: ""
});

const updateUserFailureAction = (error: Promise<Error>): IUpdateUserFailure => ({
  type: UPDATE_USER_FAILURE,
  updateError: error
});

// логаут
const sessionTerminationSuccessAction = (): ISessionTerminationSuccess => ({
  type: SESSION_TERMINATION_SUCCESS,
  deleteUserError: ""
});

const deleteUserStateAction = (): IDeleteUserState => ({
  type: DELETE_USER_STATE,
  user: {}
});

const setSessionTerminationStateAction = (state: boolean): ISetSessionTerminationState => ({
  type: SET_SESSION_TERMINATION_STATE,
  delete_user_success: state
});

const sessionTerminationFailureAction = (error: Promise<Error>): ISessionTerminationFailure => ({
  type: SESSION_TERMINATION_FAILURE,
  deleteUserError: error
});

export const clearRegistrationStateAction = (): IClearRegistrationState => ({
  type: CLEAR_REGISTRATION_STATE,
});

export const clearForgotPasswordStateAction = (): IClearForgotPasswordState => ({
  type: CLEAR_FORGOT_PASSWORD_STATE,
});

export const clearResetPasswordStateAction = (): IClearResetPasswordState => ({
  type: CLEAR_RESET_PASSWORD_STATE,
});

export const clearSessionTerminationStateAction = (): IClearSessionTerminationState => ({
  type: CLEAR_SESSION_TERMINATION_STATE,
});

// регистрация нового пользователя
export const register: TRegister = (name, email, password) => {
  return function (dispatch: AppDispatch) {
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
          dispatch(userRegistrationSuccessAction())
          dispatch(setRegistrationStateAction(true))
        }
      })
      .catch((err) => {
        dispatch(userRegistrationFailureAction(err))
        dispatch(setRegistrationStateAction(false))
        console.log(err);
      })
  }
}

// логин существующего пользователя
export const login: TLogin = (email, password) => {
  return function (dispatch: AppDispatch) {
    dispatch(setLoggingInAction(true))
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
          dispatch(userLoginSuccessAction(res.user))
          dispatch(setLoginStateAction(true))
          dispatch(setUserLoggedInStateAction(true))
        }
      })
      .then(() => {
        dispatch(setLoggingInAction(false))
      })
      .catch((err) => {
        dispatch(userLoginFailureAction(err))
        dispatch(setLoginStateAction(false))
        dispatch(setLoggingInAction(false))
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoggingInAction(false))
      })
  }
}

// восстановление пароля существующего пользователя (отправка кода на мыло)
export const forgotPassword: TForgotPassword = (email) => {
  return function (dispatch: AppDispatch) {
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
          dispatch(forgotPasswordSuccessAction())
          dispatch(setForgotPasswordStateAction(true))
        }
      })
      .catch((err) => {
        dispatch(forgotPasswordFailureAction(err))
        dispatch(setForgotPasswordStateAction(false))
        console.log(err);
      })
  }
}

// восстановление пароля существующего пользователя (отправка нового пароля и кода из письма)
export const resetPassword: TResetPassword = (password, token) => {
  return function (dispatch: AppDispatch) {
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
          dispatch(resetPasswordSuccessAction())
          dispatch(setResetPasswordStateAction(true))
        }
      })
      .catch((err) => {
        dispatch(resetPasswordFailureAction(err))
        dispatch(setResetPasswordStateAction(false))
        console.log(err);
      })
  }
}

// авторизация пользователя
export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(setLoggingInAction(true))
    refreshFetch(`${baseURL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie('token')}`
      },
    })
      .then((res) => {
        dispatch(getUserSuccessAction())
        dispatch(setUserStateAction(res.user))
        dispatch(setUserLoggedInStateAction(true))
      })
      .then(() => {
        dispatch(setLoggingInAction(false))
      })
      .catch((err) => {
        dispatch(getUserFailureAction(err))
        dispatch(setUserLoggedInStateAction(false))
        dispatch(setLoggingInAction(false))
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoggingInAction(false))
      })
  }
}

// изменение данных пользователя
export const updateUser: TUpdateUser = (userData) => {
  return function (dispatch: AppDispatch) {
    refreshFetch(`${baseURL}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": userData?.name,
        "email": userData?.email
      }),
    })
      .then((res) => {
        dispatch(updateUserSuccessAction())
        dispatch(setUserStateAction(res.user))
      })
      .catch((err) => {
        dispatch(updateUserFailureAction(err))
        console.log(err);
      })
  }
}

// завершение сеанса пользователя
export const deleteUser: AppThunk = () => {
  const refreshToken = getCookie('refreshToken');
  return function (dispatch: AppDispatch) {
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
          dispatch(sessionTerminationSuccessAction())
          dispatch(deleteUserStateAction())
          dispatch(setSessionTerminationStateAction(true))
          dispatch(setUserLoggedInStateAction(false))
          deleteCookie('token');
          deleteCookie('refreshToken');
        }
      })
      .catch((err) => {
        dispatch(sessionTerminationFailureAction(err))
        dispatch(setSessionTerminationStateAction(false))
        console.log(err);
      })
  }
}
