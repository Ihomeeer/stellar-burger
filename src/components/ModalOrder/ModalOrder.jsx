// Модалка с деталями заказа
import styles from "./ModalOrder.module.css";
import { IngredientsContext } from '../../services/IngredientsContext';
import successIcon from "../../images/success.svg";
import PropTypes from 'prop-types';

function ModalOrder ({ orderNumber }) {

  return (
    <div className={styles.container}>
      <p className={`${styles.number} text text_type_digits-large mt-4`}>{orderNumber}</p>
      <h2 className={`${styles.title} text text_type_main-medium mt-8`}>идентификатор заказа</h2>
      <img alt="все удачно" src={successIcon} className={`${styles.success} mt-15 mb-15`} />
      <p className={`${styles.text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styles.text}text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

ModalOrder.propTypes = {
  orderNumber: PropTypes.number.isRequired
}

export default ModalOrder;