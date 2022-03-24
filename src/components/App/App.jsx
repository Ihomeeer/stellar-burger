import React from 'react';
import appStyles from './App.module.css';
import { IngredientsContext } from '../../services/IngredientsContext';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import ModalIngredient from '../ModalIngredient/ModalIngredient';
import ModalOrder from '../ModalOrder/ModalOrder';
import api from '../../utils/api';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const enhancer = composeEnhancers(applyMiddleware(thunk));

// const store = createStore(rootReducer, enhancer);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

function App() {
  // Стейт для записи всех ингредиентов
  const [basicIngredients, setBasicIngredients] = React.useState([]);
  // Стейт для выбора ингредиента для модалки
  const [ingredient, setIngredient] = React.useState({})
  // видимость модалки с информацией об ингредиенте
  const [modalIngredientVisible, setModalIngredientVisible] = React.useState(false);
  // видимость модалки с информацией о заказе
  const [modalOrderVisible, setModalOrderVisible] = React.useState(false);
  // Разные ингредиенты для контекста
  const[ingredientsContext, setIngredientsContext] = React.useState({});
  // Стейт для записи номера заказа
  const[orderNumber, setOrderNumber] = React.useState();

  // фильтр ингредиентов по типу
  const filterIngredients = (array, type) => {
    return array.filter((item) => item.type === type);
  }

  // открытие модалки с ингредиентом
  const handleOpenIngredientModal = (currentIngredient) => {
    setIngredient(currentIngredient);
    setModalIngredientVisible(true);
  }

  // открытие модалки с заказом
  const handleOpenOrderModal = (info) => {
    api.sendOrderInfo(info)
    .then((res) => {
      if (res && res.success) {
        setOrderNumber(res.order.number);
      }
    })
    .then (() => {
      setModalOrderVisible(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // закрытие модалки с ингредиентом
  const handleCloseIngredientModal = () => {
    setIngredient({});
    setModalIngredientVisible(false);
  }

  // закрытие модалки с заказом
  const handleCloseOrderModal = () => {
    setModalOrderVisible(false);
  }

  // получение ингредиентов при отрисовке страницы
  React.useEffect(() => {
    api.getAllIngredients()
    .then((res) => {
      if (res && res.success) {
        setBasicIngredients(res.data);
        setIngredientsContext({allIngredients: res.data, main: filterIngredients(res.data, 'main'), buns: filterIngredients(res.data, 'bun'), sauces: filterIngredients(res.data, 'sauce')});
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div id="app" className={appStyles.App}>
      <AppHeader />
      <IngredientsContext.Provider value={ingredientsContext}>
        <div className={appStyles.sectionContainer}>
          <BurgerIngredients
            ingredients={basicIngredients}
            openModal={handleOpenIngredientModal}
          />
          <BurgerConstructor
            openModal={handleOpenOrderModal}
          />
        </div>

        <Modal
          title="Детали ингредиента"
          isModalVisible={modalIngredientVisible}
          closeModal={handleCloseIngredientModal}
        >
          <ModalIngredient
            item={ingredient}
          />
        </Modal>

        <Modal
          isModalVisible={modalOrderVisible}
          closeModal={handleCloseOrderModal}
        >
          <ModalOrder
            orderNumber={orderNumber}
          />
        </Modal>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
