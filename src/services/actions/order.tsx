import { checkStatus } from '../../utils/checkStatus';
import { TPlaceOrder } from '../../utils/types/actions/orderTypes';
import {
  baseURL,
  CLEAR_INGREDIENTS,
  CLEAR_COUNTERS,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  SET_ORDER_MODAL_VISIBLE,
  DELETE_ORDER_NUMBER,
  SET_ORDER_MODAL_INVISIBLE
} from '../../utils/constants';
import {
  IOrderSubmitSuccess,
  ISetOrderModalVisible,
  IClearIngredients,
  IClearCounters,
  IOrderSubmitFailure,
  IDeleteOrderNumber,
  ISetOrderModalInvisible
} from '../../utils/types/actions/orderTypes';




const orderSubmitSuccessAction = (number: number): IOrderSubmitSuccess => ({
  type: ORDER_SUBMIT_SUCCESS,
  number: number
});

const setOrderModalVisibleAction = (): ISetOrderModalVisible => ({
  type: SET_ORDER_MODAL_VISIBLE,
});

const clearIngredientsAction = (): IClearIngredients => ({
  type: CLEAR_INGREDIENTS,
});

const clearCountersAction = (): IClearCounters => ({
  type: CLEAR_COUNTERS,
});

const orderSubmitFailureAction = (error: Promise<Error>): IOrderSubmitFailure => ({
  type: ORDER_SUBMIT_FAILURE,
  error: error
});

export const deleteOrderNumberAction = (): IDeleteOrderNumber => ({
  type: DELETE_ORDER_NUMBER,
});

export const setOrderModalInvisibleAction = (): ISetOrderModalInvisible => ({
  type: SET_ORDER_MODAL_INVISIBLE
});


export const placeOrder: TPlaceOrder = (info, error) => {
  return function (dispatch: any) { // убрать any --------------------------------------------------------------------
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
          dispatch(orderSubmitSuccessAction(res.order.number))
        }
      })
      .then(() => {
        dispatch(setOrderModalVisibleAction())
      })
      .then(() => {
        dispatch(clearIngredientsAction())
        dispatch(clearCountersAction())
      })
      .catch((err) => {
        dispatch(orderSubmitFailureAction(err))
        error && console.log(error)
      })
  }
}