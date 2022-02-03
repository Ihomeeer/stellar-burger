import styles from './IngredientsItem.module.css';
import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientsItem ({ item }) {
  return (
    <div className={`${styles.cardContainer} mt-6`}>
      <div className={styles.counter}>
        <Counter  count={1} size="default" />
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


export default IngredientsItem;