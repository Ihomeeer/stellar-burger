// ------------ Редакс-хранилище ------------
export type TAllIngredientsState = {
  ingredients: TBaseIngredient[];
  buns: TBaseIngredient[];
  sauces: TBaseIngredient[];
  mainIngredients: TBaseIngredient[];
  allIngredientsError: string;
  currentTab: string;
}

export type TBurgerConstructorState = {
  bun: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
}

export type TUserState = {
  user: {
    email: string;
    name: string;
  }
  isLoggedIn: boolean;
  loggingIn: boolean;
  registerError: string;
  loginError: string;
  forgotPassowrdError: string;
  resetPassowrdError: string;
  authError: string;
  updateError: string;
  deleteUserError: string;
  register_success: boolean;
  login_success: boolean;
  forgot_password_success: boolean;
  reset_password_success: boolean;
  delete_user_success: boolean;
}

export type TOrderState = {
  orderNumber: number;
  orderError: string;
  orderModalVisibility: boolean;
}


// ------------ Остальные типы ------------
// Базовый объект ингредиента
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


// Ингредиенты
export type TBurgerIngredients = {
  openModal: (currentIngredient: TBaseIngredient) => void;
}

export type TIngredientsItem = TBurgerIngredients & {
  item: TBaseIngredient;
  counter?: number;
}


// Бургерный конструктор
export type TConstructorIngredient = TBaseIngredient & {
  uid?: string;
  index?: number | undefined;
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

