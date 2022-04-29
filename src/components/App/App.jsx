import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import ModalIngredient from '../ModalIngredient/ModalIngredient';
import { SET_INGREDIENT_MODAL_INVISIBLE, DELETE_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';
import { getAllItems } from '../../services/actions/allIngredients';
import { getUser } from '../../services/actions/user';
//ИМПОРТЫ ДЛЯ РОУТИНГА___________________________________________________________________________________
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { getCookie } from '../../utils/cookie';

// фильтр ингредиентов по типу
export const filterIngredients = (array, type) => {
  return array.filter((item) => item.type === type);
}

function ModalSwitch() {
  let location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  const background = location.state && location.state.background;

  const { ingredientModalVisibility } = useSelector(
    state => state.currentIngredient
  );

  // закрытие модалки с ингредиентом
  const handleCloseIngredientModal = () => {
    dispatch({
      type: SET_INGREDIENT_MODAL_INVISIBLE,
    })
    dispatch({
      type: DELETE_CURRENT_INGREDIENT
    })
    history.goBack()
  }

  return (
    <div>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path="/ingredients/:ingredientId" exact={true}>
          <IngredientPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background &&
        <Route
          path="/ingredients/:ingredientId"
          children={
            <Modal
              title="Детали ингредиента"
              isModalVisible={ingredientModalVisibility}
              closeModal={handleCloseIngredientModal}
            >
              <ModalIngredient />
            </Modal>
          }
        />
      }
    </div>
  );
}

function App() {
  const history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const { ingredientId } = useParams();
  const { isLoggedIn } = useSelector(
    state => state.user
  );


  React.useEffect(() => {
    if (getCookie('token') && !isLoggedIn) {
        dispatch(getUser())
    }
  }, [])

  React.useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/forgot-password' && location.pathname !== '/reset-password') {
      dispatch(getAllItems());
    }
  }, [])



  return (
    <div id="app" className={appStyles.App}>
      <ModalSwitch />
    </div>
  );
}

export default App