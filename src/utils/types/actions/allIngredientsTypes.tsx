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
  SET_CURRENT_TAB,
  DELETE_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_INVISIBLE,
  SET_INGREDIENT_MODAL_VISIBLE,
  SET_CURRENT_INGREDIENT
} from '../../constants';

import { IClearCounters, IClearIngredients } from './orderTypes';

import { TBaseIngredient, TConstructorIngredient } from '../types';

export interface IGetAllItems {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: TBaseIngredient[];
}

export interface ISetMainIngredients {
  readonly type: typeof SET_MAIN_INGREDIENTS;
  readonly items: TBaseIngredient[];
}

export interface ISetBuns {
  readonly type: typeof SET_BUNS;
  readonly items: TBaseIngredient[];
}

export interface ISetSauces {
  readonly type: typeof SET_SAUCES;
  readonly items: TBaseIngredient[];
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly error: Promise<Error>;
}

export interface IAddItem {
  readonly type: typeof ADD_ITEM;
  readonly item: TBaseIngredient;
}

export interface IIncreaseCounter {
  readonly type: typeof INCREASE_COUNTER;
  readonly item: TBaseIngredient;
};

export interface IDecreaseCounter {
  readonly type: typeof DECREASE_COUNTER;
  readonly item: TBaseIngredient;
};

export interface ISetBun {
  readonly type: typeof SET_BUN;
  readonly item: TBaseIngredient;
};

export interface IDragArray {
  readonly type: typeof DRAG_ARRAY;
  readonly ingredients: TConstructorIngredient[];
};


export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  readonly item: TConstructorIngredient;
};


export interface ISetCurrentTab {
  readonly type: typeof SET_CURRENT_TAB;
  readonly currentTab: string;
};

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
};

export interface ISetIngredientModalInvisible {
  readonly type: typeof SET_INGREDIENT_MODAL_INVISIBLE;
};
export interface ISetIngredientModalVisible {
  readonly type: typeof SET_INGREDIENT_MODAL_VISIBLE;
};

export interface ISetCurrentIngredient{
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly item: TBaseIngredient;
};

export type TAllIngredientsTypes =
  | IGetAllItems
  | ISetMainIngredients
  | ISetBuns
  | ISetSauces
  | IGetItemsFailed
  | IAddItem
  | IIncreaseCounter
  | IDecreaseCounter
  | ISetBun
  | IDragArray
  | IDeleteItem
  | ISetCurrentTab
  | IClearCounters
  | IClearIngredients
  | IDeleteCurrentIngredient
  | ISetIngredientModalInvisible
  | ISetIngredientModalVisible
  | ISetCurrentIngredient;