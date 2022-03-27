// Конструктор бургеров (правый который)
import React from 'react';
import styles from './BurgerConstructor.module.css';
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'


function BurgerConstructor({ openModal }) {
  const { bun, ingredients } = useSelector(
    state => state.burgerConstructor
  );
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
  const totalPrice = React.useMemo(() => ingredients && ingredients?.reduce((prevPrice, item) => prevPrice + item.price, 0), [ingredients, bun])

  const submitOrder = () => {
    idArray && openModal(idArray)
  }

  return (
    <section className={`${styles.section} ml-10 pt-25`}>

      {bun && <BurgerConstructorItem
        item={bun}
        isTop
        isLocked
      />}

      <ul className={styles.list}>
        {ingredients && ingredients?.map((item) => {
          console.log(ingredients)
          return (
            <li key={item._id} className={styles.listItem}>
              <BurgerConstructorItem item={item} />
            </li>
          )
        })}
      </ul>

      {bun && <BurgerConstructorItem
        item={bun}
        isBottom
        isLocked
      />}

      <div className={`${styles.lowerPanel} mt-10 mr-4`}>
        {/* Тут пока стоимость булки наследует костыльность изначального булочного хардкода */}
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