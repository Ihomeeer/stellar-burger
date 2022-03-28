import { v4 as uuidv4 } from 'uuid';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS
} from "../actions/allIngredients";

import {
  ADD_ITEM,
  DELETE_ITEM,
  DRAG_ARRAY,
  SET_BUN
} from '../actions/constructorIngredients';

const initialAllIngredientsState = {
  ingredients: [],
  buns: '',
  sauces: '',
  mainIngredients: '',
  allIngredientsError: ''
}

const initialConstructorState = {
  bun:
  {
    calories: 643,
    carbohydrates: 85,
    counter: 0,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7"
  },
  ingredients: []
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

export const constructorIngredientsReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = {...action.item}
      newItem.uid = uuidv4();
      return {
        ...state,
        ingredients: [...state.ingredients, newItem]
      }
    }
    case DELETE_ITEM: {
      const modifiedState = { ...state };
      const itemIndex = state.ingredients.filter(item => item.uid === action.uid);
      if (itemIndex !== -1) {
        modifiedState.ingredients.splice(itemIndex, 1);
        return {
          ...state,
          ingredients: [...modifiedState.ingredients]
        }
      }
      else {
        return state;
      }
    }
    case DRAG_ARRAY: {
      return {
        ...state,
        ingredients: [...action.ingredients]
      }
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.item
      }
    }
    default: {
      return state;
    }
  }
}