import styles from './MainPage.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import Modal from '../../components/Modal/Modal';
import ModalOrder from '../../components/ModalOrder/ModalOrder';
//ИМПОРТЫ ДЛЯ DnD___________________________________________________________________________________
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//ИМПОРТЫ ДЛЯ РЕДАКСА___________________________________________________________________________________
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
  SET_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_VISIBLE,
} from '../../services/actions/currentIngredient';
import {
  DELETE_ORDER_NUMBER,
  SET_ORDER_MODAL_INVISIBLE,
  placeOrder
} from '../../services/actions/order';
import { TBaseIngredient } from '../../utils/types'

function MainPage() {
  const dispatch = useDispatch();

  const { orderNumber, orderError, orderModalVisibility } = useSelector(
    (state: RootStateOrAny) => state.order
  );

  // открытие модалки с ингредиентом
  const handleOpenIngredientModal = (currentIngredient: TBaseIngredient) => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      item: currentIngredient
    })
    dispatch({
      type: SET_INGREDIENT_MODAL_VISIBLE,
    })
  }

  // открытие модалки с заказом
  const handleOpenOrderModal = (info: string[]) => {
    dispatch(placeOrder(info, orderError))
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
    <>
      <div className={styles.sectionContainer}>
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
        isModalVisible={orderModalVisibility}
        closeModal={handleCloseOrderModal}
      >
        <ModalOrder
          orderNumber={orderNumber}
        />
      </Modal>

    </>
  );
}

export default MainPage;