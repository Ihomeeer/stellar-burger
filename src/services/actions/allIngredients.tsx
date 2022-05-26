import { baseURL } from '../../utils/constants';
import { filterIngredients } from '../../components/App/App';
import { checkStatus } from '../../utils/checkStatus';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS,
  ADD_ITEM,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_BUN,
  DRAG_ARRAY,
  DELETE_ITEM,
  SET_CURRENT_TAB
} from '../../utils/constants';
// import { store } from '../../index'
import { TBaseIngredient, TConstructorIngredient } from '../../utils/types/types';
import {
  IGetAllItems,
  ISetMainIngredients,
  ISetBuns,
  ISetSauces,
  IGetItemsFailed,
  IAddItem,
  IIncreaseCounter,
  IDecreaseCounter,
  ISetBun,
  IDragArray,
  IDeleteItem,
  ISetCurrentTab
} from '../../utils/types/actions/allIngredientsTypes';

const getItemsSuccessAction = (data: TBaseIngredient[]): IGetAllItems => ({
  type: GET_ITEMS_SUCCESS,
  items: data
});

const setMainIngredientsAction = (data: TBaseIngredient[]): ISetMainIngredients => ({
  type: SET_MAIN_INGREDIENTS,
  items: data
});

const setBunsAction = (data: TBaseIngredient[]): ISetBuns => ({
  type: SET_BUNS,
  items: data
});

const setSaucesAction = (data: TBaseIngredient[]): ISetSauces => ({
  type: SET_SAUCES,
  items: data
})

const getItemsFailedAction = (error: Promise<Error>): IGetItemsFailed => ({
  type: GET_ITEMS_FAILED,
  error: error
})

export const addItemAction = (data: TBaseIngredient): IAddItem => ({
  type: ADD_ITEM,
  item: data
});

export const increaseCounterAction = (data: TBaseIngredient): IIncreaseCounter => ({
  type: INCREASE_COUNTER,
  item: data
});

export const setBunAction = (data: TBaseIngredient): ISetBun => ({
  type: SET_BUN,
  item: data
});

export const dragArrayAction = (data: TConstructorIngredient[]): IDragArray => ({
  type: DRAG_ARRAY,
  ingredients: data
});

export const deleteItemAction = (data: TConstructorIngredient): IDeleteItem => ({
  type: DELETE_ITEM,
  item: data
});

export const decreaseCounterAction = (data: TBaseIngredient): IDecreaseCounter => ({
  type: DECREASE_COUNTER,
  item: data
});

export const setCurrentTabAction = (data: string): ISetCurrentTab => ({
  type: SET_CURRENT_TAB,
  currentTab: data
});




export const getAllItems = () => {
  return function (dispatch: any) { // убрать any ------------------------------------------------------------
    fetch(`${baseURL}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => checkStatus(response))
      .then(res => {
        const newData = res.data.map((item: TBaseIngredient) => ({ ...item, counter: 0 })
        )
        dispatch(getItemsSuccessAction(newData));
        const mainIngredients = filterIngredients(newData, 'main');
        dispatch(setMainIngredientsAction(mainIngredients));
        const buns = filterIngredients(newData, 'bun');
        dispatch(setBunsAction(buns));
        const sauces = filterIngredients(newData, 'sauce');
        dispatch(setSaucesAction(sauces));
      })
      .catch((err) => {
        dispatch(getItemsFailedAction(err));
      })
  }
}
