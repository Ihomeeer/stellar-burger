import { FormEvent } from 'react';
import { Location } from "history";
import { store } from '../../services/store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TAllIngredientsTypes } from '../types/actions/allIngredientsTypes';
import { TOrderTypes } from '../types/actions/orderTypes';
import { TUserTypes } from '../types/actions/userTypes';
import { TWSTypes } from './actions/WSTypes';

// ------------ Редакс-хранилище ------------
export type TApplicationActions = | TAllIngredientsTypes | TOrderTypes | TUserTypes | TWSTypes;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

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

export type TCurrentIngredientState = {
  currentIngredient: TBaseIngredient;
  ingredientModalVisibility: boolean;
}


// ------------ Остальные типы ------------
// Базовый объект ингредиента
export type TBaseIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  counter: number;
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

export type TFilterIngredients = (array: Array<TBaseIngredient>, type: string) => Array<TBaseIngredient>

// EnteringForm
export type TEnteringForm = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formTitle: string;
  buttonTitle: string;
}

// Массив с ингредиентами и их количеством для модалок заказов
export type TIngredientsQtyItem = {
  item: string;
  amount: number;
}
export type TIngredientsQtyData = TIngredientsQtyItem[];


// ------------ Ингредиенты ------------
export type TBurgerIngredients = {
  openModal: (currentIngredient: TBaseIngredient) => void;
}

export type TIngredientsItem = TBurgerIngredients & {
  item: TBaseIngredient;
  counter?: number;
}


// ------------ Бургерный конструктор ------------
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


// ------------ Модалки ------------
// ModalOverlay
export type TModalOverlay = {
  isModalVisible: boolean;
  closeModal: () => void;
}

// ModalOrder
export type TModalOrder = {
  orderNumber: number;
}

// Modal
export type TModal = TModalOverlay & {
  title?: string;
}

export type TModalOrderCard = {
  item: TConstructorIngredient | undefined;
  amount: number;
  currency: number;
}

export type TModalOrderInfo = {
  isPage: boolean;

}



// ------------ Профиль ------------
// ProfilePage
export type TProfilePage = {
  hint: string;
}

// ------------ Навигация ------------
// History
export type THistory = History & {
  location: {
    pathname: string;
  };
  forgotPassword?: boolean;
}

// Location
export type TLocation = {
  from: Location;
  background: Location;
};


// ------------ API ------------
type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  }
}

export type TResponseHeaders = {
  Accept?: string;
  'Content-Type': string;
  authorization?: string;
}

export type TApiOptions = {
  readonly method?: 'PATCH' | 'POST' | 'GET';
  headers?: TResponseHeaders;
  readonly body?: BodyInit | null | undefined;
}

export type TApiResponse = Response & {
  readonly refreshToken?: string;
  readonly accessToken?: string;
  readonly success?: boolean;
  readonly message?: string;
  readonly user?: TUserState;
  readonly order?: TOrderResponse;
}

export type TRefreshFetch = (url: string, options: TApiOptions) => Promise<any>


//  ------------ Кукисы  ------------
type TCookieProps = {
  [key: string]: number | Date | string | boolean;
  expires?: any;
}

export type TGetCookie = (name: string) => string | undefined;

export type TDeleteCookie = (name: string) => void;

export type TSetCookie = (name: string, value: string, props?: TCookieProps) => void;


//  ------------ WebSocket  ------------

export type TResponseData = {
  orders: ReadonlyArray<TResponseOrderItem>;
  total: number;
  totalToday: number;
}

export type TResponseOrderItem = {
  ingredients: ReadonlyArray<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
