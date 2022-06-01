import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer  from '../services/reducers/rootReducer';
import { socketMiddleware } from '../utils/socketMiddleware';
import { TWsActions } from '../utils/types/actions/WSTypes';
import { compose } from 'redux';
import { wsFeedUrl } from '../utils/constants';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../utils/constants';

export const wsActions: TWsActions = {
  wsInit: WS_CONNECTION_START,
  // wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  // wsClose: WS_CONNECTION_END,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  // wsPingPong: WS_SEND_PONG,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsFeedUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);