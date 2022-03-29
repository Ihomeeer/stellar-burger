// Конструктор бургеров (правый который)
import React, { useCallback } from 'react';
import styles from './BurgerConstructor.module.css';
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_ITEM, DRAG_ARRAY, SET_BUN } from '../../services/actions/constructorIngredients';
import { useDrop } from 'react-dnd';
import { v4 as generateUid } from 'uuid';


function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector(
    state => state.burgerConstructor
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (ingredient) => {
    const { item } = ingredient;
    if (!item.uid) {
      if (item.type !== 'bun') {
        // const newItem = {...item}
        item.uid = generateUid();
        dispatch({
          type: ADD_ITEM,
          item: item
        })
      } else {
        dispatch({
          type: SET_BUN,
          item: item
        })
      }
    }
  }

  let idArray = [];

  // функция-парсер айди из массива ингредиентов, добавленных в бургер
  function parceId() {
    ingredients && ingredients?.map((item) => {
      return idArray.push(item._id);
    })
    bun && idArray?.push(bun._id, bun._id)
  }

  React.useEffect(() => {
    parceId();
  }, [ingredients, bun, openModal])

  // Вот тут стоимость считается, но это - БЕЗБУЛОЧНАЯ стоимость
  const totalPrice = React.useMemo(() => ingredients && ingredients?.reduce((prevPrice, item) => prevPrice + item.price, 0), [ingredients])

  const submitOrder = () => {
    idArray && openModal(idArray)
  }

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = ingredients[dragIndex];
    if (draggedItem) {
      const modifiedItems = [...ingredients];
      modifiedItems.splice(dragIndex, 1);
      modifiedItems.splice(hoverIndex, 0, draggedItem);
      dispatch({
        type: DRAG_ARRAY,
        ingredients: modifiedItems
      })
    } else {
      return
    }
  };

  return (
    <section className={`${styles.section} ml-10 pt-25`}>
      <div className={`${styles.listContainer}`} ref={dropTarget}>
        {bun && <BurgerConstructorItem
          item={bun}
          isTop
          isLocked
        />}

        <ul className={styles.list} >
          {ingredients && ingredients?.map((item, index) => {
            return (
              <li key={item.uid} className={styles.listItem}>
                <BurgerConstructorItem
                  item={item}
                  index={index}
                  moveItem={moveItem}
                />
              </li>
            )
          })}
        </ul>

        {bun && <BurgerConstructorItem
          item={bun}
          isBottom
          isLocked
        />}
      </div>
      <div className={`${styles.lowerPanel} mt-10 mr-4`}>
        <p className="text text_type_main-large mr-2">{ingredients && totalPrice + bun.price * 2}</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="medium" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;