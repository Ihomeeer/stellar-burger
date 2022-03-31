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
import { useDispatch } from 'react-redux';
import { getAllItems } from '../../services/actions/allIngredients';
import {
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT
} from '../../services/actions/currentIngredient';

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
  // видимость модалки с информацией об ингредиенте
  const [modalIngredientVisible, setModalIngredientVisible] = React.useState(false);
  // видимость модалки с информацией о заказе
  const [modalOrderVisible, setModalOrderVisible] = React.useState(false);
  // Стейт для записи номера заказа
  const [orderNumber, setOrderNumber] = React.useState();


  //КОНСТАНТЫ ДЛЯ РЕДАКСА___________________________________________________________________________________
  const dispatch = useDispatch();
  // открытие модалки с ингредиентом
  const handleOpenIngredientModal = (currentIngredient) => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      item: currentIngredient
    })
    setModalIngredientVisible(true);
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
          setOrderNumber(res.order.number);
        }
      })
      .then(() => {
        setModalOrderVisible(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // закрытие модалки с ингредиентом
  const handleCloseIngredientModal = () => {
    dispatch({
      type: DELETE_CURRENT_INGREDIENT
    })
    setModalIngredientVisible(false);
  }

  // закрытие модалки с заказом
  const handleCloseOrderModal = () => {
    setModalOrderVisible(false);
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
        isModalVisible={modalIngredientVisible}
        closeModal={handleCloseIngredientModal}
      >
        <ModalIngredient />
      </Modal>

      <Modal
        isModalVisible={modalOrderVisible}
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
