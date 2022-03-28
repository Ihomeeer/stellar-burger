
import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../utils/PropTypes";
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { DELETE_ITEM } from '../../services/actions/constructorIngredients';

function BurgerConstructorItem ({ item, isTop, isBottom, isLocked}) {
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch({
      type: DELETE_ITEM,
      item: item
    })
  }

  const ref = useRef(null)
  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`}>
      {!isLocked && <DragIcon type="primary"/>}
      <ConstructorElement
        type={isTop ? 'top' : isBottom ? 'bottom' : ''}
        isLocked={isLocked ? true : false}
        text={isTop ? item.name + ` верх` : isBottom ? item.name + ` низ` : item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDelete(item)}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: itemPropTypes.isRequired,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
  isLocked: PropTypes.bool
}

export default BurgerConstructorItem;