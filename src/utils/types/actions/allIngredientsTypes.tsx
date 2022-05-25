import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS,
} from '../../constants';

import { TBaseIngredient } from '../types';

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
  error: Promise<Error>;
}


