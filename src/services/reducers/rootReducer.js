import { combineReducers } from 'redux';
import { allIngredientsReducer, constructorIngredientsReducer, currentIngredientReducer, orderReducer } from './reducers';
import { userReducer } from './userReducer';


// Корневой редьюсер
const rootReducer = combineReducers({
  user: userReducer,
  allIngredients: allIngredientsReducer,
  burgerConstructor: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer
})

export default rootReducer;