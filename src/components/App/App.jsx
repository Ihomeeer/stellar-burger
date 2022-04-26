import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
//ИМПОРТЫ ДЛЯ РОУТИНГА___________________________________________________________________________________
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

function ModalSwitch() {
  let location = useLocation();
  const dispatch = useDispatch();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background;

  return (
    <div>
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

      {/* Show the modal when a background page is set */}
      {/* {background && <Route path="/img/:id" children={<Modal />} />} */}
    </div>
  );
}

// фильтр ингредиентов по типу
export const filterIngredients = (array, type) => {
  return array.filter((item) => item.type === type);
}

function App() {

  return (
    <div id="app" className={appStyles.App}>
      <ModalSwitch />
    </div>
  );
}

export default App
