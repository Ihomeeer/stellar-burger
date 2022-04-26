import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
//ИМПОРТЫ ДЛЯ РОУТИНГА___________________________________________________________________________________
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation, vuseParams } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';


// фильтр ингредиентов по типу
export const filterIngredients = (array, type) => {
  return array.filter((item) => item.type === type);
}

function App() {

  return (
    <div id="app" className={appStyles.App}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
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

