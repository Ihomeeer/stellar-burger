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

function App() {

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
  const handleOpenOrderModal = () => {
    setModalOrderVisible(true);
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

  // хук для записи всех ингредиентов
  const [basicIngredients, setBasicIngredients] = React.useState([]);
  // хук для выбора ингредиента для модалки
  const [ingredient, setIngredient] = React.useState({})
  // видимость модалки с информацией об ингредиенте
  const [modalIngredientVisible, setModalIngredientVisible] = React.useState(false);
  // видимость модалки с информацией о заказе
  const [modalOrderVisible, setModalOrderVisible] = React.useState(false);
  const[ingredientsContext, setIngredientsContext] = React.useState({});


  // const [ingedientsIds, setIngredientsIds] = React.useState([]);
  // let idArray = [];

  // // функция-парсер айди из массива ингредиентов, добавленных в бургер
  // function parceId() {
  //   basicIngredients?.map((item) => {
  //     return idArray.push(item._id);
  //   })
  //     buns[0] && idArray?.push(buns[0]._id, buns[0]._id)
  // }

  // React.useEffect(() => {
  //   parceId();
  //   console.log(idArray);
  //   if (idArray[0] !== undefined) {
  //     setIngredientsIds(idArray);
  //   }
  //   if (ingedientsIds.length > 0) {
  //     getOrderNumber(ingedientsIds);
  //   }

  //   // тут пока захардкожено под все ингредиенты, не забыть переделать и функцию и ЗАВИСИМОСТИ
  // }, [basicIngredients])

  // ---------
  // !!!место зарезервировано для еще одного useState, но для номера заказа!!!
  // ---------

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

  // function getOrderNumber(info) {
  //   api.sendOrderInfo(info)
  //   .then((res) => {
  //     console.log(res);
  //   })
  // }

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
            orderNumber={1337}
          />
        </Modal>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
