import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {

  return (
    <div className={appStyles.App}>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;
