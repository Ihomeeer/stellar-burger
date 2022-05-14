
export type TBaseIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly counter: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
}

export type TConstructorIngredient = TBaseIngredient & {
  uid?: string;
  index?: number | undefined;
}

export type TBurgerIngredients = {
  openModal: (currentIngredient: TBaseIngredient) => void;
}

export type TIngredientsItem = TBurgerIngredients & {
  item: TBaseIngredient;
  counter?: number;
}

export type TAllIngredientsState = {
  ingredients: TBaseIngredient[];
  buns: TBaseIngredient[] | undefined;
  sauces: TBaseIngredient[] | undefined,
  mainIngredients: TBaseIngredient[] | undefined,
  allIngredientsError: string | undefined,
  currentTab: string | undefined
}

export type TBurgerConstructor = {
  openModal: (info: string[]) => void;
}

export type TBurgerConstructorItem = {
  item: TConstructorIngredient;
  index?: number | undefined;
  isTop?: boolean;
  isBottom?: boolean;
  isLocked?: boolean;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}
