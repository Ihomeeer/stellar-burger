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
  CLEAR_RESET_PASSWORD_STATE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SET_USER_STATE,
  DELETE_USER_STATE
} from '../actions/user';

const initialUserState = {
  user: {},
  registerError: "",
  loginError: "",
  forgotPassowrdError: "",
  resetPassowrdError: "",
  authError: "",
  updateError: "",
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
        registerError: action.registerError,
      }
    }
    case USER_REGISTRATION_FAILURE: {
      return {
        ...state,
        registerError: action.registerError,
      }
    }
    case SET_REGISTRATION_STATE: {
      return {
        ...state,
        register_success: action.register_success
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
      }
    }
    case SET_LOGIN_STATE: {
      return {
        ...state,
        login_success: action.login_success
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
        forgotPassowrdError: action.error
      }
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        forgotPassowrdError: action.error
      }
    }
    case SET_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        forgot_password_success: action.forgot_password_success,
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
        resetPassowrdError: action.resetPassowrdError
      }
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        resetPassowrdError: action.resetPassowrdError
      }
    }
    case SET_RESET_PASSWORD_STATE: {
      return {
        ...state,
        reset_password_success: action.reset_password_success,
      }
    }
    case CLEAR_RESET_PASSWORD_STATE: {
      return {
        ...state,
        reset_password_success: false,
        resetPassowrdError: ""
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        authError: action.authError
      }
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        authError: action.authError
      }
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateError: action.updateError
      }
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        updateError: action.updateError
      }
    }
    case SET_USER_STATE: {
      return {
        ...state,
        user: action.user,
      }
    }
    case DELETE_USER_STATE: {
      return {
        ...state,
        user: {},
      }
    }
    default: {
      return state;
    }
  }
}