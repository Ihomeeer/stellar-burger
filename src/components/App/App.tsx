import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { ingredients, dummy } from '../../utils/data'

function App() {

  return (
    <div className={appStyles.App}>
      <AppHeader />
      <div className={appStyles.sectionContainer}>
        <BurgerIngredients
          ingredients={ingredients}
        />
        <BurgerConstructor
        ingredients={ingredients}
        dummy={dummy}
        />
      </div>

    </div>
  );
}

export default App;
