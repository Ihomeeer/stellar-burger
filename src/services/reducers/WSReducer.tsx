import { TWSState } from "../../utils/types/reducers/WSReducerTypes";
import { TWSTypes } from "../../utils/types/actions/WSTypes";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../utils/constants';

const initialWSState: TWSState = {
  wsConnected: false,
  responseData: null,
  wsError: undefined,
  orderFeedModalVisibility: false
};

export const wsReducer = (state: TWSState = initialWSState, action: TWSTypes) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        responseData: action.responseData
      }
    default:
      return state;
  }
};
