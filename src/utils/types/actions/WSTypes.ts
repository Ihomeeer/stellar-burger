import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START_P,
  WS_CONNECTION_SUCCESS_P,
  WS_CONNECTION_ERROR_P,
  WS_CONNECTION_CLOSED_P,
  WS_GET_MESSAGE_P,
} from '../../constants';
import { TResponseData, TBaseIngredient } from '../types';

export type wsActions = {
  wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_P,
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS_P,
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_ERROR_P,
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_CLOSED_P,
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MESSAGE_P,
}

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE,
  readonly responceData: TResponseData,
  readonly ingredients: ReadonlyArray<TBaseIngredient>
}

export type TWSTypes =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction;

