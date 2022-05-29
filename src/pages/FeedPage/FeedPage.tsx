import React, { FC } from 'react';
import styles from './FeedPage.module.css';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { responseData } from '../../utils/data';

export const FeedPage = () => {
  // console.log(responseData.data.orders)
  return (
    <>
      <h2 className={`${styles.header} text text_type_main-large mt-8 mb-4`}>Лента заказов</h2>
      <OrderFeed
        data={responseData.data.orders}
      />
    </>
  )
}