
import React from "react";
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../utils/PropTypes";
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorItem ({ item, isTop, isBottom, isLocked}) {
  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`}>
      {!isLocked && <DragIcon type="primary"/>}
      <ConstructorElement
        type={isTop ? 'top' : isBottom ? 'bottom' : ''}
        isLocked={isLocked ? true : false}
        text={isTop ? item.name + ` верх` : isBottom ? item.name + ` низ` : item.name}
        price={item.price}
        thumbnail={item.image}
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