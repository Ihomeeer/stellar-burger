import { combineReducers } from 'redux';
import { allIngredientsReducer, constructorIngredientsReducer, currentIngredientReducer, orderReducer } from './reducers';
import { userReducer } from './userReducer';
import { wsReducer } from './WSReducer';


// Корневой редьюсер
const rootReducer = combineReducers({
  user: userReducer,
  allIngredients: allIngredientsReducer,
  burgerConstructor: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  ws: wsReducer
})

export default rootReducer;