import { TResponseData } from '../../utils/types/types';
import {
  IWSConnectionStartAction,
  IWSConnectionSuccessAction,
  IWSConnectionErrorAction,
  IWSConnectionClosedAction,
  IWSGetMessageAction,
  IGetCurrentFeedId,
  IsetFeedModalVisibility
} from '../../utils/types/actions/WSTypes';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_CURRENTFEEDID,
  SET_FEED_MODAL_VISIBILITY,
  // WS_CONNECTION_START_P,
  // WS_CONNECTION_SUCCESS_P,
  // WS_CONNECTION_ERROR_P,
  // WS_CONNECTION_CLOSED_P,
  // WS_GET_MESSAGE_P,
} from '../../utils/constants';


export const WSConnectionStartAction = (): IWSConnectionStartAction => ({
  type: WS_CONNECTION_START
});

export const WSConnectionSuccessAction = (): IWSConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS
});

export const WSConnectionErrorAction = (): IWSConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR
});

export const WSConnectionClosedAction = (): IWSConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED
});

export const WSGetMessageAction = (responseData: TResponseData ): IWSGetMessageAction => ({
  type: WS_GET_MESSAGE,
  responseData: responseData
});

export const getCurrentFeedIdAction = (id: string): IGetCurrentFeedId => ({
  type: WS_GET_CURRENTFEEDID,
  currentFeedId: id
})

export const setFeedModalVisibilityAction = (state: boolean): IsetFeedModalVisibility => ({
  type: SET_FEED_MODAL_VISIBILITY,
  orderFeedModalVisibility: state
})
