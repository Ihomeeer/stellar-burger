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
} from '../../constants';

export type TRegister = (name: string, email: string, password: string) => void;

export type TLogin = (email: string, password: string) => void;

export type TForgotPassword = (email: string) => void;

export type TResetPassword = (password: string, token: string) => void;

export type TUpdateUser = (userData: TUser) => void;

export type TUser = {
  name?: string;
  email?: string;
}

export interface IUserRegistrationSuccess {
  readonly type: typeof USER_REGISTRATION_SUCCESS;
  readonly registerError: string;
}

export interface ISetRegistrationState {
  readonly type: typeof SET_REGISTRATION_STATE;
  readonly register_success: boolean;
};

export interface IUserRegistrationFailure {
  readonly type: typeof USER_REGISTRATION_FAILURE;
  readonly registerError: Promise<Error>;
};


export interface ISetLoggingIn {
  readonly type: typeof SET_LOGGING_IN;
  readonly loggingIn: boolean
};

export interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS;
  readonly user: TUser;
  readonly loginError: string;
};

export interface IUserLoginFailure {
  readonly type: typeof USER_LOGIN_FAILURE;
  readonly loginError: Promise<Error>;
};

export interface ISetLoginState {
  readonly type: typeof SET_LOGIN_STATE;
  readonly login_success: boolean;
};

export interface ISetUserLoggedInState {
  readonly type: typeof SET_USER_LOGGED_IN_STATE;
  readonly isLoggedIn: boolean;
};


export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly forgotPassowrdError: string;
};

export interface IForgotPasswordState {
  readonly type: typeof SET_FORGOT_PASSWORD_STATE;
  readonly forgot_password_success: boolean;
};

export interface IForgotPasswordFailure {
  readonly type: typeof FORGOT_PASSWORD_FAILURE;
  readonly forgotPassowrdError: Promise<Error>;
};


export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly resetPassowrdError: string;
};

export interface IResetPasswordFailure {
  readonly type: typeof RESET_PASSWORD_FAILURE;
  readonly resetPassowrdError: Promise<Error>;
};

export interface IResetPasswordState {
  readonly type: typeof SET_RESET_PASSWORD_STATE;
  readonly reset_password_success: boolean;
};


export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly authError: string;
};

export interface IGetUserFailure {
  readonly type: typeof GET_USER_FAILURE;
  readonly authError: Promise<Error>;
};

export interface ISetUserState {
  readonly type: typeof SET_USER_STATE;
  readonly user: TUser;
}


export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly updateError: string;
};

export interface IUpdateUserFailure {
  type: typeof UPDATE_USER_FAILURE;
  updateError: Promise<Error>;
};


export interface ISessionTerminationSuccess {
  type: typeof SESSION_TERMINATION_SUCCESS;
  deleteUserError: string;
};

export interface IDeleteUserState {
  type: typeof DELETE_USER_STATE;
  user: {};
};

export interface ISetSessionTerminationState {
  type: typeof SET_SESSION_TERMINATION_STATE;
  delete_user_success: boolean;
};

export interface ISessionTerminationFailure {
  type: typeof SESSION_TERMINATION_FAILURE;
  deleteUserError: Promise<Error>;
};

export type TUserTypes =
  | IUserRegistrationSuccess
  | ISetRegistrationState
  | IUserRegistrationFailure
  | ISetLoggingIn
  | IUserLoginSuccess
  | IUserLoginFailure
  | ISetLoginState
  | ISetUserLoggedInState
  | IForgotPasswordSuccess
  | IForgotPasswordState
  | IForgotPasswordFailure
  | IResetPasswordSuccess
  | IResetPasswordFailure
  | IResetPasswordState
  | IGetUserSuccess
  | IGetUserFailure
  | ISetUserState
  | IUpdateUserSuccess
  | IUpdateUserFailure
  | ISessionTerminationSuccess
  | IDeleteUserState
  | ISetSessionTerminationState
  | ISessionTerminationFailure;