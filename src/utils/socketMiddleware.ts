import { TWSTypes } from './types/actions/WSTypes';
import { TWsActions } from './types/actions/WSTypes';
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './types/types';
import { getCookie } from './cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions, authorizedRequest: boolean = false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSTypes) => {
      const { dispatch } = store;

      const { type } = action!;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // объект класса WebSocket
        const token = authorizedRequest ? `?token=${getCookie('accessToken')}` : '';
        // если токен есть, то прилепится к URL
        socket = new WebSocket(`${wsUrl}${token}`);
        console.log('ws start')
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          console.log('ws open');
          dispatch({ type: onOpen });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = () => {
          console.log('ws error');
          dispatch({ type: onError });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          console.log('ws data transfer');
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, responseData: restParsedData });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = () => {
          console.log('ws closed')
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
}