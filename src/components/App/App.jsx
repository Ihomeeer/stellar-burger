import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import ModalIngredient from '../ModalIngredient/ModalIngredient';
import ModalOrder from '../ModalOrder/ModalOrder';
import api from '../../utils/api';



function App() {

  const filterBuns = (array) => {
    return array.filter((item) => item.type === 'bun')
  }

  const handleOpenIngredientModal = (currentIngredient) => {
    setIngredient(currentIngredient);
    setModalIngredientVisible(true);
  }

  const handleOpenOrderModal = () => {
    setModalOrderVisible(true);
  }

  const handleCloseIngredientModal = () => {
    setIngredient({});
    setModalIngredientVisible(false);
  }

  const handleCloseOrderModal = () => {
    setModalOrderVisible(false);
  }

  const [basicIngredients, setBasicIngredients] = React.useState([]);
  // хук для выбора ингредиента
  const [ingredient, setIngredient] = React.useState({})
  // видимость модалки с информацией об ингредиенте
  const [modalIngredientVisible, setModalIngredientVisible] = React.useState(false);
  // видимость модалки с информацией о заказе
  const [modalOrderVisible, setModalOrderVisible] = React.useState(false);
  // костыль для булок
  const [buns, setBuns] = React.useState([])

  // ---------
  // !!!место зарезервировано для еще одного useState, но для номера заказа!!!
  // ---------


  // получение ингредиентов при отрисовке страницы
  React.useEffect(() => {
    api.getAllIngredients()
    .then((res) => {
      setBasicIngredients(res.data);
      setBuns(filterBuns(res.data));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div id="app" className={appStyles.App}>
      <AppHeader />
      <div className={appStyles.sectionContainer}>
        <BurgerIngredients
          ingredients={basicIngredients}
          openModal={handleOpenIngredientModal}
        />
        <BurgerConstructor
          ingredients={basicIngredients}
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

    </div>
  );
}

export default App;
