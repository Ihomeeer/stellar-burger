
import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../utils/PropTypes";
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {  useSelector, useDispatch } from 'react-redux';
import { DELETE_ITEM } from '../../services/actions/constructorIngredients';

function BurgerConstructorItem({ item, index, isTop, isBottom, isLocked, moveItem }) {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(
    state => state.burgerConstructor
  );

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(drop(ref));

  const handleDelete = (item) => {
    
    dispatch({
      type: DELETE_ITEM,
      item: item
    })
  }

  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`} ref={isLocked ? null : ref} style={{ opacity }}>
      {!isLocked && <DragIcon type="primary" />}
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