import { combineReducers } from 'redux';
import { allIngredientsReducer } from './reducers';


// Корневой редьюсер
const rootReducer = combineReducers({
  allIngredientsReducer
})

export default rootReducer;