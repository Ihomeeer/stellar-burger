import React from 'react';
import { FC, MouseEvent, useMemo  } from 'react';
import styles from './OrderCard.module.css';
import { useSelector } from '../../services/hooks';
import { TAllIngredientsState } from '../../utils/types/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as generateUid } from 'uuid';
import { dateCalc } from '../../utils/dateCalc';
import { useDispatch } from '../../services/hooks';

import { getCurrentFeedIdAction, setFeedModalVisibilityAction } from '../../services/actions/wsActions';

export const OrderCard: any = (props: any) => {

  const dispatch = useDispatch();

  const slicedIdArray =
    props.order.ingredients.length < 5
      ?
      props.order.ingredients
      :
      props.order.ingredients.slice(0, 5)

  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients
  );

  const currentOrderHandler = (id: string): void => {
    dispatch(setFeedModalVisibilityAction(true));
    dispatch(getCurrentFeedIdAction(id));
  }

  const localizedStatus: string =
    props.order.status === "done"
      ? "Выполнен"
      : props.order.status === "pending"
        ? "Готовится"
        : props.order.status === "created"
          ? "Создан"
          : "";

  const totalPrice = useMemo(() => {
    let total = 0;
    props.order.ingredients.map((el: any) => {
      const orderedItems = ingredients.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [props.order.ingredients, ingredients]);


  const sliceHandler =
    props.order.ingredients &&
      props.order.ingredients.slice(5).length !== 0
      ?
      props.order.ingredients.slice(5).length
      :
      null

  return (
    <div className={styles.cardContainer} onClick={() => { currentOrderHandler(props.order._id) }}>
      <div className={`${props.isPersonalOrders ? styles.cardLarge : styles.cardSmall} ${styles.card}`}>
        <div className={`${styles.orderNumberContainer} mb-6`}>
          <p className={`${styles.orderNumber} text text_type_digits-default`}>#{props.order.number}</p>
          <p className={`${styles.createdAt} text text_type_main-default text_color_inactive`}>{dateCalc(props.order.createdAt)}</p>
        </div>
        <p className={`${styles.name} text text_type_main-medium`}>{props.order.name}</p>
        {
          props.isPersonalOrders
            ?
            <p className={`${styles.status} text text_type_main-small mt-2`}>{localizedStatus}</p>
            :
            null
        }
        <div className={`${styles.ingredients} mt-7`}>
          <ul className={styles.ingredientsContainer}>
            {
              slicedIdArray && ingredients &&
              slicedIdArray.map((item: any) => {
                const current = ingredients.find(ingredient => ingredient._id === item)
                return (
                  <li className={styles.item} key={generateUid()}>
                    <img className={styles.image} src={current && current!.image_mobile} alt={current && current!.name} />
                  </li>
                )
              })
            }
            {sliceHandler &&
              <div className={`${styles.moreIngredients} text text_type_digits-default`}>
                <span>+{sliceHandler}</span>
              </div>

            }
          </ul>
          <div className={styles.currencyContainer}>
            <p className="text text_type_digits-default">
              {totalPrice}
            </p>
            <div className={`${styles.currency} ml-2`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
