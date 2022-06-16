import { wsReducer, initialWSState } from './WSReducer';
import { TResponseData } from '../../../utils/types/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_CURRENTFEEDID,
  SET_FEED_MODAL_VISIBILITY
} from '../../../utils/constants';

import { TWSTypes } from '../../../utils/types/actions/WSTypes';

const responseData: TResponseData = {
  "orders": [
    {
      "_id": "62aaf983fa747e001bd52a45",
      "ingredients": [
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
      "createdAt": "2022-06-16T09:36:03.590Z",
      "updatedAt": "2022-06-16T09:36:03.994Z",
      "number": 17867
    },
    {
      "_id": "62aaf90ffa747e001bd52a41",
      "ingredients": [
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
      "createdAt": "2022-06-16T09:34:07.746Z",
      "updatedAt": "2022-06-16T09:34:08.113Z",
      "number": 17866
    },
    {
      "_id": "62aaf6c9fa747e001bd52a36",
      "ingredients": [
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
      "createdAt": "2022-06-16T09:24:25.682Z",
      "updatedAt": "2022-06-16T09:24:26.030Z",
      "number": 17865
    }
  ],
  "total": 17780,
  "totalToday": 230
}

describe("websocket reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as TWSTypes)).toEqual(initialWSState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialWSState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialWSState,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialWSState, {
        type: WS_CONNECTION_ERROR,
      })
    ).toEqual({
      ...initialWSState,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialWSState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialWSState,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(initialWSState, {
        type: WS_GET_MESSAGE,
        responseData: responseData
      })
    ).toEqual({
      ...initialWSState,
      responseData: responseData
    });
  });

  it("should handle WS_GET_CURRENTFEEDID", () => {
    expect(
      wsReducer(initialWSState, {
        type: WS_GET_CURRENTFEEDID,
        currentFeedId: '62aaf6c9fa747e001bd52a36'
      })
    ).toEqual({
      ...initialWSState,
      currentFeedId: '62aaf6c9fa747e001bd52a36'
    });
  });

  it("should handle SET_FEED_MODAL_VISIBILITY", () => {
    expect(
      wsReducer(initialWSState, {
        type: SET_FEED_MODAL_VISIBILITY,
        orderFeedModalVisibility: true,
      })
    ).toEqual({
      ...initialWSState,
      orderFeedModalVisibility: true,
      currentFeedId: null,
    });
  });
});