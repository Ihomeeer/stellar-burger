import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_CURRENT_TAB,
  CLEAR_COUNTERS,
  ADD_ITEM,
  DELETE_ITEM,
  DRAG_ARRAY,
  SET_BUN,
  CLEAR_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_VISIBLE,
  SET_INGREDIENT_MODAL_INVISIBLE,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  DELETE_ORDER_NUMBER,
  SET_ORDER_MODAL_VISIBLE,
  SET_ORDER_MODAL_INVISIBLE
} from '../../../utils/constants';

import {
  TInitialAllIngredientsState,
  TInitialConstructorState,
  TInitialCurrentIngrState,
  TInitialOrderState,
} from '../../../utils/types/reducers/reducersTypes';

import { TAllIngredientsTypes } from '../../../utils/types/actions/allIngredientsTypes';
import { TOrderTypes } from '../../../utils/types/actions/orderTypes';

export const initialAllIngredientsState: TInitialAllIngredientsState = {
  ingredients: [],
  buns: undefined,
  sauces: undefined,
  mainIngredients: undefined,
  allIngredientsError: '',
  currentTab: 'buns'
}

export const initialConstructorState: TInitialConstructorState = {
  bun: undefined,
  ingredients: []
}

export const initialCurrentIngrState: TInitialCurrentIngrState = {
  currentIngredient: undefined,
  ingredientModalVisibility: false
}

export const initialOrderState: TInitialOrderState = {
  orderNumber: null,
  orderError: '',
  orderModalVisibility: false
}

export const allIngredientsReducer = (state = initialAllIngredientsState, action: TAllIngredientsTypes) => {
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
    case INCREASE_COUNTER: {
      const newState = { ...state }
      const currentItem = state.ingredients.findIndex((item) => {
        return item._id === action.item._id
      })
      if (action.item.type === 'bun') {
        // выпиливание остальных булок
        newState!.buns!.map((bun) => {
          return bun.counter = 0
        });
        // 2, потому что булки всегда парные
        newState.ingredients[currentItem].counter += 2;
      } else {
        newState.ingredients[currentItem].counter += 1;
      }
      return {
        ...newState,
      }
    }
    case DECREASE_COUNTER: {
      const newState = { ...state }
      const currentItem = state.ingredients.findIndex((item) => {
        return item._id === action.item._id
      })
      if (action.item.type === 'bun') {
        //булки всегда парные
        newState.ingredients[currentItem].counter -= 2;
      } else {
        newState.ingredients[currentItem].counter -= 1;
      }
      return {
        ...newState,
      }
    }
    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab
      }
    }
    case CLEAR_COUNTERS: {
      const newState = { ...state }
      newState.ingredients.map((item) => { return item.counter = 0 })
      return {
        ...newState
      }
    }
    default: {
      return state;
    }
  }
}

export const constructorIngredientsReducer = (state = initialConstructorState, action: TAllIngredientsTypes) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = { ...action.item }
      return {
        ...state,
        ingredients: [...state.ingredients!, newItem]
      }
    }
    case DELETE_ITEM: {
      const modifiedState = { ...state };
      const item = state.ingredients!.filter(item => item.uid === action.item.uid);
      const itemIndex = state.ingredients!.indexOf(item[0]);
      if (itemIndex !== -1) {
        modifiedState.ingredients!.splice(itemIndex, 1);
        return {
          ...state,
          ingredients: [...modifiedState.ingredients!]
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
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        bun: '',
        ingredients: []
      }
    }
    default: {
      return state;
    }
  }
}

export const currentIngredientReducer = (state = initialCurrentIngrState, action: TAllIngredientsTypes) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item
      }
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: ''
      }
    }
    case SET_INGREDIENT_MODAL_VISIBLE: {
      return {
        ...state,
        ingredientModalVisibility: true
      }
    }
    case SET_INGREDIENT_MODAL_INVISIBLE: {
      return {
        ...state,
        ingredientModalVisibility: false
      }
    }
    default: {
      return state;
    }
  }
}

export const orderReducer = (state = initialOrderState, action: TOrderTypes) => {
  switch (action.type) {
    case ORDER_SUBMIT_SUCCESS: {
      return {
        ...state,
        orderNumber: action.number,
        orderError: ''
      }
    }
    case ORDER_SUBMIT_FAILURE: {
      return {
        ...state,
        orderError: action.error
      }
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: null,
        orderError: ''
      }
    }
    case SET_ORDER_MODAL_VISIBLE: {
      return {
        ...state,
        orderModalVisibility: true
      }
    }
    case SET_ORDER_MODAL_INVISIBLE: {
      return {
        ...state,
        orderModalVisibility: false
      }
    }
    default: {
      return state;
    }
  }
}