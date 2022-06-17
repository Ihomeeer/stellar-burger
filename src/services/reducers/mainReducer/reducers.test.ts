import { TAllIngredientsTypes } from '../../../utils/types/actions/allIngredientsTypes';
import * as actions from '../../actions/allIngredients';
import * as orderActions from '../../actions/order';
import { TOrderTypes } from '../../../utils/types/actions/orderTypes';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_BUNS,
  SET_SAUCES,
  SET_MAIN_INGREDIENTS,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_CURRENT_TAB,
  ADD_ITEM,
  DELETE_ITEM,
  DRAG_ARRAY,
  SET_BUN,
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_VISIBLE,
  SET_INGREDIENT_MODAL_INVISIBLE,
  ORDER_SUBMIT_SUCCESS,
  DELETE_ORDER_NUMBER,
  SET_ORDER_MODAL_VISIBLE,
  SET_ORDER_MODAL_INVISIBLE
} from '../../../utils/constants';
import {
  initialAllIngredientsState,
  initialConstructorState,
  initialCurrentIngrState,
  initialOrderState,
  allIngredientsReducer,
  constructorIngredientsReducer,
  currentIngredientReducer,
  orderReducer
} from './reducers';

const ingredientsData = [
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    counter: 0
  },
  {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    counter: 0
  }
];

describe('allIngredients reducer', () => {
  it('should return the initial state of allIngredientsReducer state', () => {
    expect(allIngredientsReducer(undefined, {} as TAllIngredientsTypes)).toEqual(initialAllIngredientsState)
  });

  it("should handle GET_ITEMS_SUCCESS", () => {
    const expectedAction = {
      type: GET_ITEMS_SUCCESS,
      items: ingredientsData
    }
    expect(actions.getItemsSuccessAction(ingredientsData)).toEqual(expectedAction);
  });

  it("should handle GET_ITEMS_FAILED", () => {
    const expectedAction = {
      type: GET_ITEMS_FAILED,
      error: 'ошибка'
    }
       // @ts-ignore
    expect(actions.getItemsFailedAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_BUNS", () => {
    const expectedAction = {
      type: SET_BUNS,
      items: ingredientsData
    }
    expect(actions.setBunsAction(ingredientsData)).toEqual(expectedAction);
  });

  it("should handle SET_SAUCES", () => {
    const expectedAction = {
      type: SET_SAUCES,
      items: ingredientsData
    }
    expect(actions.setSaucesAction(ingredientsData)).toEqual(expectedAction);
  });

  it("should handle SET_MAIN_INGREDIENTS", () => {
    const expectedAction = {
      type: SET_MAIN_INGREDIENTS,
      items: ingredientsData
    }
    expect(actions.setMainIngredientsAction(ingredientsData)).toEqual(expectedAction);
  });

  it("should handle INCREASE_COUNTER", () => {
    const expectedAction = {
      type: INCREASE_COUNTER,
      item: ingredientsData[0]
    }
    expect(actions.increaseCounterAction(ingredientsData[0])).toEqual(expectedAction);
  });

  it("should handle DECREASE_COUNTER", () => {
    const expectedAction = {
      type: DECREASE_COUNTER,
      item: ingredientsData[0]
    }
    expect(actions.decreaseCounterAction(ingredientsData[0])).toEqual(expectedAction);
  });

  it("should handle SET_CURRENT_TAB", () => {
    const expectedAction = {
      type: SET_CURRENT_TAB,
      currentTab: 'соусы'
    }
    expect(actions.setCurrentTabAction('соусы')).toEqual(expectedAction);
  });
});

describe('constructorIngredients reducer', () => {
  it('should return the initial state of constructorIngredientsReducer state', () => {
    expect(constructorIngredientsReducer(undefined, {} as TAllIngredientsTypes)).toEqual(initialConstructorState)
  });

  it("should handle ADD_ITEM", () => {
    const expectedAction = {
      type: ADD_ITEM,
      item: ingredientsData[0]
    }
    expect(actions.addItemAction(ingredientsData[0])).toEqual(expectedAction);
  });

  it("should handle DELETE_ITEM", () => {
    const expectedAction = {
      type: DELETE_ITEM,
      item: ingredientsData[0]
    }
    expect(actions.deleteItemAction(ingredientsData[0])).toEqual(expectedAction);
  });

  it("should handle DRAG_ARRAY", () => {
    const expectedAction = {
      type: DRAG_ARRAY,
      ingredients: ingredientsData
    }
    expect(actions.dragArrayAction(ingredientsData)).toEqual(expectedAction);
  });

  it("should handle SET_BUN", () => {
    const expectedAction = {
      type: SET_BUN,
      item: ingredientsData[0]
    }
    expect(actions.setBunAction(ingredientsData[0])).toEqual(expectedAction);
  });
});

describe('currentIngredient reducer', () => {
  it('should return the initial state of currentIngredientReducer state', () => {
    expect(currentIngredientReducer(undefined, {} as TAllIngredientsTypes)).toEqual(initialCurrentIngrState)
  });

  it("should handle SET_CURRENT_INGREDIENT", () => {
    const expectedAction = {
      type: SET_CURRENT_INGREDIENT,
      item: ingredientsData[0]
    }
    expect(actions.setCurrentIngredientAction(ingredientsData[0])).toEqual(expectedAction);
  });

  it("should handle DELETE_CURRENT_INGREDIENT", () => {
    const expectedAction = {
      type: DELETE_CURRENT_INGREDIENT
    }
    expect(actions.deleteCurrentIngredientAction()).toEqual(expectedAction);
  });

  it("should handle SET_INGREDIENT_MODAL_VISIBLE", () => {
    const expectedAction = {
      type: SET_INGREDIENT_MODAL_VISIBLE,
    }
    expect(actions.setIngredientModalVisibleAction()).toEqual(expectedAction);
  });

  it("should handle SET_INGREDIENT_MODAL_INVISIBLE", () => {
    const expectedAction = {
      type: SET_INGREDIENT_MODAL_INVISIBLE,
    }
    expect(actions.setIngredientModalInvisibleAction()).toEqual(expectedAction);
  });
});

describe('order reducer', () => {
  it('should return the initial state of currentIngredientReducer state', () => {
    expect(orderReducer(undefined, {} as TOrderTypes)).toEqual(initialOrderState)
  });

  it("should handle ORDER_SUBMIT_SUCCESS", () => {
    const expectedAction = {
      type: ORDER_SUBMIT_SUCCESS,
      number: 12345
    }
    expect(orderActions.orderSubmitSuccessAction(12345)).toEqual(expectedAction);
  });

  it("should handle DELETE_ORDER_NUMBER", () => {
    const expectedAction = {
      type: DELETE_ORDER_NUMBER
    }
    expect(orderActions.deleteOrderNumberAction()).toEqual(expectedAction);
  });

  it("should handle SET_ORDER_MODAL_VISIBLE", () => {
    const expectedAction = {
      type: SET_ORDER_MODAL_VISIBLE,
    }
    expect(orderActions.setOrderModalVisibleAction()).toEqual(expectedAction);
  });

  it("should handle SET_ORDER_MODAL_INVISIBLE", () => {
    const expectedAction = {
      type: SET_ORDER_MODAL_INVISIBLE,
    }
    expect(orderActions.setOrderModalInvisibleAction()).toEqual(expectedAction);
  });
});