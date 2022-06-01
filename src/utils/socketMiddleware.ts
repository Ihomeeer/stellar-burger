import { TWSTypes } from './types/actions/WSTypes';
// import { TWsProfileFeedActions } from '../actions/wsProfileFeed';
import type { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED_P,
  WS_CONNECTION_ERROR_P,
  WS_CONNECTION_START_P,
  WS_CONNECTION_SUCCESS_P,
  WS_GET_MESSAGE_P
} from './constants';
import { AppDispatch, RootState } from './types/types';
import { getCookie } from './cookie';



export type wsActions = {
  wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_P,
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS_P,
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED_P,
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR_P,
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MESSAGE_P
}

export const socketMiddleware = (wsUrl: string, wsActions: wsActions, authorizedRequest: boolean = false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSTypes) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // объект класса WebSocket
        const token = authorizedRequest ? `?token=${getCookie('accessToken')}` : '';
        // если токен есть, то прилепится к URL
        socket = new WebSocket(`${wsUrl}${token}`);
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = () => {
          dispatch({ type: onError });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, feed: restParsedData, ingredients: getState().allIngredients.ingredients });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
}