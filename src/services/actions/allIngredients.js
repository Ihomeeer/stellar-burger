import { baseURL } from '../../utils/constants';
import { filterIngredients, checkStatus } from '../../components/App/App';


export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const SET_BUNS = 'SET_BUNS';
export const SET_SAUCES = 'SET_SAUCES';
export const SET_MAIN_INGREDIENTS = 'SET_MAIN_INGREDIENTS';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';


export function getAllItems() {
  return function (dispatch) {
    fetch(`${baseURL}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => checkStatus(response))
      .then(res => {
        const newData = res.data.map((item) => ({...item, counter: 0})
        )
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: newData
        });
        const mainIngredients = filterIngredients(newData, 'main');
        dispatch({
          type: SET_MAIN_INGREDIENTS,
          items: mainIngredients
        });
        const buns = filterIngredients(newData, 'bun');
        dispatch({
          type: SET_BUNS,
          items: buns
        });
        const sauces = filterIngredients(newData, 'sauce');
        dispatch({
          type: SET_SAUCES,
          items: sauces
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
          error: `Произошла ошибка ${err.statusCode}`
        });
      })
  };
}