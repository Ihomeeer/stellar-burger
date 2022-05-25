import { baseURL } from '../../utils/constants';
import { filterIngredients } from '../../components/App/App';
import { checkStatus } from '../../utils/checkStatus';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS,
} from '../../utils/constants';
// import { store } from '../../index'
import { TBaseIngredient } from '../../utils/types/types';
import { IGetAllItems, ISetMainIngredients, ISetBuns, ISetSauces, IGetItemsFailed } from '../../utils/types/actions/allIngredientsTypes';

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

export function getAllItems() {
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