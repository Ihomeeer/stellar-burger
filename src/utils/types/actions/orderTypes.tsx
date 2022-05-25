import {
  CLEAR_INGREDIENTS,
  CLEAR_COUNTERS,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  SET_ORDER_MODAL_VISIBLE,
} from '../../constants';

export type TPlaceOrder = (info: string[], error: string) => void;



export interface IOrderSubmitSuccess {
  readonly type: typeof ORDER_SUBMIT_SUCCESS;
  readonly number: number;
}

export interface ISetOrderModalVisible {
  readonly type: typeof SET_ORDER_MODAL_VISIBLE;
}

export interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export interface IClearCounters {
  readonly type: typeof CLEAR_COUNTERS;
}

export interface IOrderSubmitFailure {
  readonly type: typeof ORDER_SUBMIT_FAILURE;
  error: Promise<Error>;
}

