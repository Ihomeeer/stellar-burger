import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS
} from "../actions/allIngredients";

const initialAllIngredientsState = {
  ingredients: [],
  buns: '',
  sauces: '',
  mainIngredients: '',
  allIngredientsError: ''
}

export const allIngredientsReducer = (state = initialAllIngredientsState, action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        ingredients: action.items,
        allIngredientsError: ''
      }
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        allIngredientsError: action.error
      }
    }
    case SET_BUNS: {
      return {
        ...state,
        buns: action.items
      }
    }
    case SET_SAUCES: {
      return {
        ...state,
        sauces: action.items
      }
    }
    case SET_MAIN_INGREDIENTS: {
      return {
        ...state,
        mainIngredients: action.items
      }
    }
    default: {
      return state;
    }
  }
}