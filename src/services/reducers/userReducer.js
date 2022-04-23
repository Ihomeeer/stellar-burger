import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  SET_REGISTRATION_STATE,
  CLEAR_REGISTRATION_STATE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_LOGIN_STATE,
  CLEAR_LOGIN_STATE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_FORGOT_PASSWORD_STATE,
  CLEAR_FORGOT_PASSWORD_STATE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_RESET_PASSWORD_STATE,
  CLEAR_RESET_PASSWORD_STATE
} from '../actions/user';

const initialUserState = {
  user: {},
  registerError: "",
  loginError: "",
  forgotPassowrdError: "",
  resetPassowrdError: "",
  register_success: false,
  login_success: false,
  forgot_password_success: false,
  reset_password_success: false,
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerError: ""
      }
    }
    case USER_REGISTRATION_FAILURE: {
      return {
        ...state,
        registerError: action.error,
        register_success: false
      }
    }
    case SET_REGISTRATION_STATE: {
      return {
        ...state,
        register_success: true
      }
    }
    case CLEAR_REGISTRATION_STATE: {
      return {
        ...state,
        registerError: "",
        register_success: false
      }
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginError: ""
      }
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        user: {},
        loginError: action.error,
        login_success: false
      }
    }
    case SET_LOGIN_STATE: {
      return {
        ...state,
        login_success: true
      }
    }
    case CLEAR_LOGIN_STATE: {
      return {
        ...state,
        loginError: "",
        login_success: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgot_password_success: true
      }
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        forgot_password_success: false,
        forgotPassowrdError: action.error
      }
    }
    case SET_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        forgot_password_success: true,
      }
    }
    case CLEAR_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        forgot_password_success: false,
        forgotPassowrdError: ""
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        reset_password_success: true
      }
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        reset_password_success: false,
        resetPassowrdError: action.error
      }
    }
    case SET_RESET_PASSWORD_STATE: {
      return {
        ...state,
        reset_password_success: true,
      }
    }
    case CLEAR_RESET_PASSWORD_STATE: {
      return {
        ...state,
        reset_password_success: false,
        resetPassowrdError: ""
      }
    }
    default: {
      return state;
    }
  }
}
