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

import { allIngredientsReducer } from './reducers';
import { TBaseIngredient } from '../../../utils/types/types';


describe('allIngredients reducer', () => {
  it('should return the initial allIngredientsReducer state', () => {
    expect(allIngredientsReducer(undefined, {} as TAllIngredientsTypes)).toEqual([
      {
        ingredients: [],
        buns: undefined,
        sauces: undefined,
        mainIngredients: undefined,
        allIngredientsError: '',
        currentTab: 'buns'
      }
    ])
  })

  it('should handle CREATE_ORDER_REQUEST', () => {
    const action: TAllIngredientsTypes = {
      type: GET_ITEMS_SUCCESS,
      items: TBaseIngredient[]
    };

    expect(allIngredientsReducer(undefined, action)).toEqual({
      items: action.items,
      allIngredientsError: ''
    });
  });

})



    case GET_ITEMS_SUCCESS: {
  return {
    ...state,
    ingredients: action.items,
    allIngredientsError: ''
  }
}



describe('reducer order', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as TOrderActionTypes)).toEqual({
      currentOrder: null,
      isCreating: false,
      error: null,
    });
  });

  it('should handle CREATE_ORDER_REQUEST', () => {
    const action: TOrderActionTypes = {
      type: OrderActionTypes.CREATE_ORDER_REQUEST,
    };

    expect(reducer(undefined, action)).toEqual({
      currentOrder: null,
      isCreating: true,
      error: null,
    });
  });

  it('should handle CREATE_ORDER_CANCEL', () => {
    const action: TOrderActionTypes = {
      type: OrderActionTypes.CREATE_ORDER_CANCEL,
    };

    const state = {
      currentOrder: null,
      isCreating: true,
      error: null,
    };

    expect(reducer(state, action)).toEqual({
      currentOrder: null,
      isCreating: false,
      error: null,
    });
  });

  it('should handle CREATE_ORDER_SUCCESS', () => {
    const action: TOrderActionTypes = {
      type: OrderActionTypes.CREATE_ORDER_SUCCESS,
    };

    const state = {
      currentOrder: null,
      isCreating: true,
      error: null,
    };

    expect(reducer(state, action)).toEqual({
      currentOrder: null,
      isCreating: false,
      error: null,
    });
  });

  it('should handle CREATE_ORDER_ERROR', () => {
    const action: TOrderActionTypes = {
      type: OrderActionTypes.CREATE_ORDER_ERROR,
      payload: 'error',
    };

    const state = {
      currentOrder: null,
      isCreating: true,
      error: null,
    };

    expect(reducer(state, action)).toEqual({
      currentOrder: null,
      isCreating: false,
      error: 'error',
    });
  });

  it('should handle SET_CURRENT_ORDER', () => {
    const action: TOrderActionTypes = {
      type: OrderActionTypes.SET_CURRENT_ORDER,
      payload: 666,
    };

    expect(reducer(undefined, action)).toEqual({
      currentOrder: 666,
      isCreating: false,
      error: null,
    });
  });

  it('should handle REMOVE_CURRENT_ORDER', () => {
    const action: TOrderActionTypes = {
      type: OrderActionTypes.REMOVE_CURRENT_ORDER,
    };

    const state = {
      currentOrder: 666,
      isCreating: false,
      error: null,
    };

    expect(reducer(state, action)).toEqual({
      currentOrder: null,
      isCreating: false,
      error: null,
    });
  });
});






















export const aadssdallIngredientsReducer = (state = initialAllIngredientsState, action: TAllIngredientsTypes) => {
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