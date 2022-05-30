import React, { FC } from 'react';
import styles from './ModalOrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { ScoreBoard } from '../../components/ScoreBoard/ScoreBoard';
import { responseData } from '../../utils/data';
import { ModalOrderCard } from '../ModalOrderCard/ModalOrderCard';
import { useSelector } from '../../services/hooks';
import { TAllIngredientsState } from '../../utils/types/types';
import { v4 as generateUid } from 'uuid';


export const ModalOrderInfo = (props: any) => {
  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients
  );

    console.log(props.items)
  return (
    <div className={styles.container}>
      <h3 className={`${styles.orderName} text text_type_main-medium`}>{props.order.name}</h3>
      <p className={`${styles.status} text text_type_main-small mt-2`}>{props.status}</p>
      <p className={`${styles.listTitle} text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={styles.list}>
        {
          props.items &&
          props.items.map((item: any) => {
            const current = ingredients.find(ingredient => ingredient._id === item._id);
            const amount = props.items.filter((ingredient: { _id: any; }) => ingredient._id === item._id).length;
            return (
              <li className={styles.item} key={generateUid()}>
                <ModalOrderCard
                  item={current}
                  amount={amount}
                  currency={props.sum}
                />
              </li>
            )
          })
        }
      </ul>
      <div className={`${styles.statusContainer} mt-5 mb-5`}>
        <p className={`${styles.createdAt} text text_type_main-default text_color_inactive`}>{props.date}</p>
        <div className={styles.currencyContainer}>
          <p className="text text_type_digits-default">
            {props.sum}
          </p>
          <div className={`${styles.currency} ml-2`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>

  )
}