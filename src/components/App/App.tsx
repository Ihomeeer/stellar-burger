import React, { FC } from 'react';
import { TCurrentIngredientState, TLocation, TFilterIngredients } from '../../utils/types/types';
import { TWSState } from '../../utils/types/reducers/WSReducerTypes';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from '../../services/hooks';
import Modal from '../Modal/Modal';
import ModalIngredient from '../ModalIngredient/ModalIngredient';
import { ModalOrderInfo } from '../ModalOrderInfo/ModalOrderInfo';
import { getAllItems } from '../../services/actions/allIngredients';
import { getUser } from '../../services/actions/user';
import { deleteCurrentIngredientAction, setIngredientModalInvisibleAction } from '../../services/actions/allIngredients';
import { setFeedModalVisibilityAction } from '../../services/actions/wsActions';
//ИМПОРТЫ ДЛЯ РОУТИНГА___________________________________________________________________________________
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { FeedPage } from '../../pages/FeedPage/FeedPage';
import { OrderDetailsPage } from '../../pages/OrderDetailsPage/OrderDetailsPage';
import { getCookie } from '../../utils/cookie';
import moment from 'moment';
import 'moment/locale/ru';

// фильтр ингредиентов по типу
export const filterIngredients: TFilterIngredients = (array, type) => {
  return array.filter((item) => item.type === type);
}

const ModalSwitch: FC = () => {
  let location = useLocation<TLocation>();
  const dispatch = useDispatch();
  const history = useHistory();
  const background = location.state && location.state.background;

  const { ingredientModalVisibility } = useSelector(
    (state): TCurrentIngredientState => state.currentIngredient
  );

  const { orderFeedModalVisibility } = useSelector(
    (state): TWSState => state.ws
  );

  // закрытие модалки с ингредиентом
  const handleCloseIngredientModal = () => {
    dispatch(setIngredientModalInvisibleAction())
    dispatch(deleteCurrentIngredientAction())
    history.goBack()
  }

  // закрытие модалки с деталями заказа из ленты
  const handleCloseOrderFeedModal = () => {
    dispatch(setFeedModalVisibilityAction(false))
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
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route
          path="/feed/:id" exact={true}>
          <OrderDetailsPage />
        </Route>


        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background &&
        <Switch>
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

          <Route
            path="/feed/:id"
            children={
              <Modal
                isModalVisible={orderFeedModalVisibility}
                closeModal={handleCloseOrderFeedModal}
              >
                <ModalOrderInfo
                isPage={false}
                />
              </Modal>
            }
          />

        </Switch>


      }
    </div>
  );
}

const App: FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    (state) => state.user
  );


  React.useEffect(() => {
    if (getCookie('token') && !isLoggedIn) {
      dispatch(getUser())
    }
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    moment.locale('ru');
    dispatch(getAllItems());
    // eslint-disable-next-line
  }, [])

  return (
    <div id="app" className={appStyles.App}>
      <ModalSwitch />
    </div>
  );
}

export default App