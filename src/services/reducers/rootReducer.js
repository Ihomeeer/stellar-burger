import { combineReducers } from 'redux';
import { allIngredientsReducer, constructorIngredientsReducer, currentIngredientReducer } from './reducers';


// Корневой редьюсер
const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  burgerConstructor: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer
})

export default rootReducer;