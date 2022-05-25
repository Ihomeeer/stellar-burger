import { baseURL } from '../../utils/constants';
import { checkStatus } from '../../utils/checkStatus';
import { CLEAR_INGREDIENTS } from '../../utils/constants';
import { CLEAR_COUNTERS } from '../../utils/constants';
import {
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  SET_ORDER_MODAL_VISIBLE,
} from '../../utils/constants';


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