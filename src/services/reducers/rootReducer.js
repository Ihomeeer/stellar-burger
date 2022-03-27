import { combineReducers } from 'redux';
import { allIngredientsReducer, constructorIngredientsReducer } from './reducers';


// Корневой редьюсер
const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  burgerConstructor: constructorIngredientsReducer
})

export default rootReducer;