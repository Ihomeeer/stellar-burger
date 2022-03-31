import { combineReducers } from 'redux';
import { allIngredientsReducer, constructorIngredientsReducer, currentIngredientReducer, orderReducer } from './reducers';


// Корневой редьюсер
const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  burgerConstructor: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer
})

export default rootReducer;