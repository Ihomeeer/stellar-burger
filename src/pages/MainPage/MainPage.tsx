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
  placeOrder
} from '../../services/actions/order';
import { setIngredientModalVisibleAction } from '../../services/actions/allIngredients';
import { TBaseIngredient, TOrderState } from '../../utils/types/types';
import { setCurrentIngredientAction } from '../../services/actions/allIngredients';
import { deleteOrderNumberAction, setOrderModalInvisibleAction } from '../../services/actions/order';

function MainPage() {
  const dispatch = useDispatch();

  const { orderNumber, orderError, orderModalVisibility } = useSelector(
    (state: RootStateOrAny): TOrderState => state.order
  );

  // открытие модалки с ингредиентом
  const handleOpenIngredientModal = (currentIngredient: TBaseIngredient) => {
    dispatch(setCurrentIngredientAction(currentIngredient))
    dispatch(setIngredientModalVisibleAction())
  }

  // открытие модалки с заказом
  const handleOpenOrderModal = (info: string[]) => {
    dispatch(placeOrder(info, orderError))
  }

  // закрытие модалки с заказом
  const handleCloseOrderModal = () => {
    dispatch(setOrderModalInvisibleAction())
    dispatch(deleteOrderNumberAction())
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