import React from "react";
import { ingredientsPropTypes } from "../../utils/PropTypes";
import styles from './BurgerConstructor.module.css';
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";

function BurgerConstructor ({ ingredients, bun }) {

  function totalPrice(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += array[i].price;
        }
        return sum;
    }

  return(
    <section className={`${styles.section} ml-10 pt-25`}>

      {/* <BurgerConstructorItem
        item={ingredients[0]}
        isTop
        isLocked
      /> */}

      <ul className={styles.list}>
        {ingredients.map((item, index) => {
          return (
            <li key={index} className={styles.listItem}>
              <BurgerConstructorItem item={item} />
            </li>
          )
        })}
      </ul>

      {/* <BurgerConstructorItem
        item={bun}
        isBottom
        isLocked
      /> */}

      <div className={`${styles.lowerPanel} mt-10 mr-4`}>
        <p className="text text_type_main-large mr-2">{totalPrice(ingredients)}</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: ingredientsPropTypes,
}

export default BurgerConstructor;