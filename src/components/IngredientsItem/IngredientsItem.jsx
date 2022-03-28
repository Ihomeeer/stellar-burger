// карточка с ингредиентом для левой секции
import styles from './IngredientsItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../utils/PropTypes";
import { useDrag } from "react-dnd";

function IngredientsItem({ item, openModal }) {
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: { item },
    collect: monitor => ({
      isDrag: monitor.isDragging()
  })
  });


  return (
    <div className={`${styles.cardContainer} ${isDrag && styles.cardContainerMoving} mt-6`} onClick={() => openModal(item)} ref={dragRef}>
      <div className={styles.counter}>
        <Counter count={item.counter} size="default" />
      </div>
      <img alt={item.name} src={item.image} className={`${styles.cardImage} ml-4 mr-4`}></img>
      <div className={`${styles.priceContainer} mb-2 mt-1`}>
        <p className="text text_type_main-default mr-1">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{item.name}</p>
    </div>
  )
}

IngredientsItem.propTypes = {
  item: itemPropTypes.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default IngredientsItem;