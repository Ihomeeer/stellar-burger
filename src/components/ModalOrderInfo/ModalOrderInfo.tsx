import React, { FC, useMemo } from 'react';
import styles from './ModalOrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dateCalc } from '../../utils/dateCalc';
import { ModalOrderCard } from '../ModalOrderCard/ModalOrderCard';
import { useSelector } from '../../services/hooks';
import { TAllIngredientsState } from '../../utils/types/types';
import { TWSState } from '../../utils/types/reducers/WSReducerTypes';
import { v4 as generateUid } from 'uuid';


export const ModalOrderInfo = () => {
  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients
  );

  const { currentFeedId, responseData } = useSelector(
    (state): TWSState => state.ws
  );

  const order = responseData && responseData.orders.find((item: any) => item._id === currentFeedId);

  const totalPrice = useMemo(() => {
    let total = 0;
    order.ingredients.map((el: any) => {
      const orderedItems = ingredients.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [order.ingredients, ingredients]);

  return (
    <div className={styles.container}>
      {
        order
        &&
        <>
          <h3 className={`${styles.orderName} text text_type_main-medium`}>{order.name}</h3>
          <p className={`${styles.status} text text_type_main-small mt-2`}>{order.status}</p>
          <p className={`${styles.listTitle} text text_type_main-medium mb-6`}>Состав:</p>
          <ul className={styles.list}>
            {
              order.items &&
              order.items.map((item: any) => {
                const current = ingredients.find(ingredient => ingredient._id === item._id);
                const amount = order.items.filter((ingredient: { _id: any; }) => ingredient._id === item._id).length;
                return (
                  <li className={styles.item} key={generateUid()}>
                    <ModalOrderCard
                      item={current}
                      amount={amount}
                      currency={totalPrice}
                    />
                  </li>
                )
              })
            }
          </ul>
          <div className={`${styles.statusContainer} mt-5 mb-5`}>
            <p className={`${styles.createdAt} text text_type_main-default text_color_inactive`}>{dateCalc(order.createdAt)}</p>
            <div className={styles.currencyContainer}>
              <p className="text text_type_digits-default">
                {totalPrice}
              </p>
              <div className={`${styles.currency} ml-2`}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}