import React, { FC, useMemo } from 'react';
import styles from './ModalOrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dateCalc } from '../../utils/dateCalc';
import { ModalOrderCard } from '../ModalOrderCard/ModalOrderCard';
import { useSelector } from '../../services/hooks';
import { TAllIngredientsState } from '../../utils/types/types';
import { TWSState } from '../../utils/types/reducers/WSReducerTypes';
import { v4 as generateUid } from 'uuid';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { setFeedModalVisibilityAction } from '../../services/actions/wsActions';
import { WSConnectionStartAction } from "../../services/actions/wsActions";

export const ModalOrderInfo: any = (isPage: any) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients
  );

  const { currentFeedId, responseData } = useSelector(
    (state): TWSState => state.ws
  );

  const { id } = useParams<{ id?: string }>();

  React.useEffect(() => {
    dispatch(WSConnectionStartAction());
  }, [dispatch]);

  React.useEffect(
    () => {

      if (id !== '') {
        dispatch(setFeedModalVisibilityAction(true));
      }
      // eslint-disable-next-line
    }, [])



  let order = currentFeedId ? responseData && responseData.orders.find((item: any) => item._id === currentFeedId) : id ? id && responseData && responseData.orders.find((item: any) => item._id === id) : null;



  const sortIngredients = (array: any) => {
    let data: any = [];
    array.map((item: string) => {
      let amount = order.ingredients.filter((ingredient: string) => ingredient === item).length;
      let itemData = { item, amount }
      let repeatedData = data.filter((dataItem: any) => dataItem.item === itemData.item).length;
      if (repeatedData === 0) {
        data.push(itemData)
      }
    })
    return data;
  }

  const modalIngredientsArray = order && order.ingredients && sortIngredients (order.ingredients);

  const localizedStatus: string =
    order && order.status === "done"
      ? "Выполнен"
      : order && order.status === "pending"
        ? "Готовится"
        : order && order.status === "created"
          ? "Создан"
          : "";

  const totalPrice = useMemo(() => {
    let total = 0;
    order && order.ingredients.map((el: any) => {
      const orderedItems = ingredients.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [order && order.ingredients, ingredients]);

  return (
    <div className={styles.container}>
      {
        order
        &&
        <>
        <h2 className={`${styles.id} ${isPage.isPage ? styles.pageId : styles.idModal} text text_type_digits-medium`}>#{order && order.number}</h2>
          <h3 className={`${styles.orderName} text text_type_main-medium`}>{order.name}</h3>
          <p className={`${styles.status} text text_type_main-small mt-2`}>{localizedStatus}</p>
          <p className={`${styles.listTitle} text text_type_main-medium mb-6`}>Состав:</p>
          <ul className={styles.list}>
            {
              order.ingredients && ingredients && modalIngredientsArray &&
              modalIngredientsArray.map((item: any) => {
                const current = ingredients.find(ingredient => ingredient._id === item.item);
                const amount = item.amount;
                return (
                  <li className={styles.item} key={generateUid()}>
                    <ModalOrderCard
                      item={current}
                      amount={amount}
                      currency={current!.price}
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