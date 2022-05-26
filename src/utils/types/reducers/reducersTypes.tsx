import { TBaseIngredient, TConstructorIngredient } from "../types";



export type TInitialAllIngredientsState = {
  ingredients: TBaseIngredient[] | [];
  buns: TBaseIngredient[] | undefined;
  sauces: TBaseIngredient[] | undefined;
  mainIngredients: TBaseIngredient[] | undefined;
  allIngredientsError: string | undefined;
  currentTab: string;
}

export type TInitialConstructorState = {
  bun: TConstructorIngredient | undefined;
  ingredients: TConstructorIngredient[] | undefined;
}

export type TInitialCurrentIngrState = {
  currentIngredient: TBaseIngredient | undefined;
  ingredientModalVisibility: boolean;
}

export type TInitialOrderState = {
  orderNumber: null | number;
  orderError: string | undefined;
  orderModalVisibility: Boolean;
}