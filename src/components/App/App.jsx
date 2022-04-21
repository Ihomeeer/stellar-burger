import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';

//ИМПОРТЫ ДЛЯ РОУТИНГА___________________________________________________________________________________
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

// фильтр ингредиентов по типу
export const filterIngredients = (array, type) => {
  return array.filter((item) => item.type === type);
}

function App() {


  return (
    <div id="app" className={appStyles.App}>
      <AppHeader />
      <Router>
        <Switch>
        <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App