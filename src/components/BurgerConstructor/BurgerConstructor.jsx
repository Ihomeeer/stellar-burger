// Конструктор бургеров (правый который)
import React from 'react';
import styles from './BurgerConstructor.module.css';
import { IngredientsContext } from '../../services/IngredientsContext';
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../utils/PropTypes";


function BurgerConstructor ({ bun, openModal }) {
  const ingredients = React.useContext(IngredientsContext);

  // Вот тут стоимость считается
  const totalPrice = React.useMemo(() => ingredients?.reduce((prevPrice, item) => prevPrice + item.price, 0) + bun?.price*2, [ingredients, bun])

  return(
    <section className={`${styles.section} ml-10 pt-25`}>

      {bun && <BurgerConstructorItem
        item={bun}
        isTop
        isLocked
      />}

      <ul className={styles.list}>
        {ingredients.map((item, index) => {
          return (
            <li key={index} className={styles.listItem}>
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
        <p className="text text_type_main-large mr-2">{bun && totalPrice}</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="medium" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  bun: itemPropTypes,
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;