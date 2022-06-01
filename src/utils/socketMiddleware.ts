import { TWSTypes } from './types/actions/WSTypes';
import { TWsActions } from './types/actions/WSTypes';
import type { Middleware, MiddlewareAPI } from 'redux';
// import {
//   // WS_CONNECTION_CLOSED,
//   // WS_CONNECTION_ERROR,
//   // WS_CONNECTION_START,
//   // WS_CONNECTION_SUCCESS,
//   // WS_GET_MESSAGE,
//   // WS_CONNECTION_CLOSED_P,
//   // WS_CONNECTION_ERROR_P,
//   // WS_CONNECTION_START_P,
//   // WS_CONNECTION_SUCCESS_P,
//   // WS_GET_MESSAGE_P
// } from './constants';
import { AppDispatch, RootState } from './types/types';
import { getCookie } from './cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions, authorizedRequest: boolean = false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSTypes) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // объект класса WebSocket
        const token = authorizedRequest ? `?token=${getCookie('accessToken')}` : '';
        // если токен есть, то прилепится к URL
        socket = new WebSocket(`${wsUrl}${token}`);
        console.log('старт блядского ВебСокета')
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          console.log("open session ws");
          dispatch({ type: onOpen });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = () => {
          console.log("there is an ws error");
          dispatch({ type: onError });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          console.log("ws message");
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, responseData: restParsedData });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = () => {
          console.log('закрывай говно')
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
}