// Конструктор бургеров (правый который)
import React from 'react';
import styles from './BurgerConstructor.module.css';
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'


function BurgerConstructor({ openModal }) {
  const { buns, sauces, mainIngredients } = useSelector(
    state => state.allIngredientsReducer
  );
  let idArray = [];


  // функция-парсер айди из массива ингредиентов, добавленных в бургер
  function parceId() {
    mainIngredients && mainIngredients?.map((item) => {
      return idArray.push(item._id);
    })
    buns && idArray?.push(buns[0]._id, buns[0]._id)
  }

  React.useEffect(() => {
    parceId();
  }, [mainIngredients, buns, openModal])

  // Вот тут стоимость считается, но это - БЕЗБУЛОЧНАЯ стоимость
  const totalPrice = React.useMemo(() => mainIngredients && mainIngredients?.reduce((prevPrice, item) => prevPrice + item.price, 0), [mainIngredients, buns])

  const submitOrder = () => {
    idArray && openModal(idArray)
  }

  return (
    <section className={`${styles.section} ml-10 pt-25`}>

      {buns && <BurgerConstructorItem
        item={buns[0]}
        isTop
        isLocked
      />}

      <ul className={styles.list}>
        {mainIngredients && mainIngredients?.map((item) => {
          return (
            // Заменить индекс на id _______________________________________________________________________
            <li key={item._id} className={styles.listItem}>
              <BurgerConstructorItem item={item} />
            </li>
          )
        })}
      </ul>

      {buns && <BurgerConstructorItem
        item={buns[0]}
        isBottom
        isLocked
      />}

      <div className={`${styles.lowerPanel} mt-10 mr-4`}>
        {/* Тут пока стоимость булки наследует костыльность изначального булочного хардкода */}
        <p className="text text_type_main-large mr-2">{buns && totalPrice + buns[0].price * 2}</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="medium" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  // openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;