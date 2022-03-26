import { baseURL } from '../../utils/constants';
import { filterIngredients, checkStatus } from '../../components/App/App';


export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const SET_BUNS = 'SET_BUNS';
export const SET_SAUCES = 'SET_SAUCES';
export const SET_MAIN_INGREDIENTS = 'SET_MAIN_INGREDIENTS';



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
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
        const mainIngredients = filterIngredients(res.data, 'main');
        dispatch({
          type: SET_MAIN_INGREDIENTS,
          items: mainIngredients
        });
        const buns = filterIngredients(res.data, 'bun');
        dispatch({
          type: SET_BUNS,
          items: buns
        });
        const sauces = filterIngredients(res.data, 'sauce');
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