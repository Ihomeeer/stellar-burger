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

  // костыльный фильтр для булок
  const filterBuns = (array) => {
    return array.filter((item) => item.type === 'bun')
  }

  // костыльный фильтр для НЕбулок
  const filterIngredients = (array) => {
    return array.filter((item) => item.type !== 'bun')
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

  // хук для записи ингредиентов БЕЗ БУЛОК
  const [basicIngredients, setBasicIngredients] = React.useState([]);
  // хук для выбора ингредиента для модалки
  const [ingredient, setIngredient] = React.useState({})
  // видимость модалки с информацией об ингредиенте
  const [modalIngredientVisible, setModalIngredientVisible] = React.useState(false);
  // видимость модалки с информацией о заказе
  const [modalOrderVisible, setModalOrderVisible] = React.useState(false);
  // костыль для булок
  const [buns, setBuns] = React.useState([]);

  // ---------
  // !!!место зарезервировано для еще одного useState, но для номера заказа!!!
  // ---------

  // получение ингредиентов при отрисовке страницы
  React.useEffect(() => {
    api.getAllIngredients()
    .then((res) => {
      if (res && res.success) {
        setBasicIngredients(filterIngredients(res.data));
        setBuns(filterBuns(res.data));
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div id="app" className={appStyles.App}>
      <AppHeader />
      <IngredientsContext.Provider value={basicIngredients}>
        <div className={appStyles.sectionContainer}>
          <BurgerIngredients
            ingredients={basicIngredients}
            openModal={handleOpenIngredientModal}
          />
          <BurgerConstructor
            bun={buns[0]}
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
