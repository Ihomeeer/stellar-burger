import { baseURL } from '../../utils/constants';
import { checkStatus } from '../../utils/checkStatus';
import { CLEAR_INGREDIENTS } from './constructorIngredients';
import { CLEAR_COUNTERS } from './allIngredients';
export const ORDER_SUBMIT_SUCCESS = 'ORDER_SUBMIT_SUCCESS';
export const ORDER_SUBMIT_FAILURE = 'ORDER_SUBMIT_FAILURE';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';
export const SET_ORDER_MODAL_VISIBLE = 'SET_ORDER_MODAL_VISIBLE';
export const SET_ORDER_MODAL_INVISIBLE = 'SET_ORDER_MODAL_INVISIBLE';

export function placeOrder(info, error) {
  return function (dispatch) {
    fetch(`${baseURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": info
      }),
    })
      .then(res => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUBMIT_SUCCESS,
            number: res.order.number
          })
        }
      })
      .then(() => {
        dispatch({
          type: SET_ORDER_MODAL_VISIBLE
        })
      })
      .then(() => {
        dispatch({
          type: CLEAR_INGREDIENTS
        })
        dispatch({
          type: CLEAR_COUNTERS
        })
      })
      .catch((err) => {
        dispatch({
          type: ORDER_SUBMIT_FAILURE,
          error: err
        })
        error && console.log(error)
      })
  }
}