import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import ModalIngredient from '../ModalIngredient/ModalIngredient';
import ModalOrder from '../ModalOrder/ModalOrder';
import api from '../../utils/api'
//ИМПОРТЫ ДЛЯ DnD___________________________________________________________________________________
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//ИМПОРТЫ ДЛЯ РЕДАКСА___________________________________________________________________________________
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../services/actions/allIngredients';
import {
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_VISIBLE,
  SET_INGREDIENT_MODAL_INVISIBLE
} from '../../services/actions/currentIngredient';

import {
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  DELETE_ORDER_NUMBER,
  SET_ORDER_MODAL_VISIBLE,
  SET_ORDER_MODAL_INVISIBLE
} from '../../services/actions/order';

// фильтр ингредиентов по типу
export const filterIngredients = (array, type) => {
  return array.filter((item) => item.type === type);
}

// проверка статуса промиса для экшенов
export const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


function App() {

  //КОНСТАНТЫ ДЛЯ РЕДАКСА___________________________________________________________________________________
  const dispatch = useDispatch();
  const { ingredientModalVisibility } = useSelector(
    state => state.currentIngredient
  );
  const { orderNumber, orderError, orderModalVisibility } = useSelector(
    state => state.burgerConstructor
  );

  // открытие модалки с ингредиентом
  const handleOpenIngredientModal = (currentIngredient) => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      item: currentIngredient
    })
    dispatch({
      type: SET_INGREDIENT_MODAL_VISIBLE,
    })
  }

  React.useEffect(() => {
    // Вызов экшена для получения всех ингредиентов от сервера
    dispatch(getAllItems())
  }, [])

  // открытие модалки с заказом
  const handleOpenOrderModal = (info) => {
    api.sendOrderInfo(info)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUBMIT_SUCCESS,
            number: res.order.number
          })
        }
      })
      .then(() => {
        dispatch({
          type: SET_ORDER_MODAL_VISIBLE
        })
      })
      .catch((err) => {
        dispatch({
          type: ORDER_SUBMIT_FAILURE,
          error: err
        })
        orderError && console.log(orderError)
      })
  }

  // закрытие модалки с ингредиентом
  const handleCloseIngredientModal = () => {
    dispatch({
      type: SET_INGREDIENT_MODAL_INVISIBLE,
    })
    dispatch({
      type: DELETE_CURRENT_INGREDIENT
    })
  }

  // закрытие модалки с заказом
  const handleCloseOrderModal = () => {
    dispatch({
      type: SET_ORDER_MODAL_INVISIBLE
    })
    dispatch({
      type: DELETE_ORDER_NUMBER
    })
  }

  return (
    <div id="app" className={appStyles.App}>
      <AppHeader />
      <div className={appStyles.sectionContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            openModal={handleOpenIngredientModal}
          />
          <BurgerConstructor
            openModal={handleOpenOrderModal}
          />
        </DndProvider>
      </div>

      <Modal
        title="Детали ингредиента"
        isModalVisible={ingredientModalVisibility}
        closeModal={handleCloseIngredientModal}
      >
        <ModalIngredient />
      </Modal>

      <Modal
        isModalVisible={orderModalVisibility}
        closeModal={handleCloseOrderModal}
      >
        <ModalOrder
          orderNumber={orderNumber}
        />
      </Modal>
    </div>
  );
}

export default App;
