import React, { FC } from 'react';
import styles from './FeedPage.module.css';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { ScoreBoard } from '../../components/ScoreBoard/ScoreBoard';
import { responseData } from '../../utils/data';

export const FeedPage = () => {
  // console.log(responseData.data.orders)
  return (
    <section className={styles.page}>
      <h2 className={`${styles.header} text text_type_main-large mt-8 mb-4`}>Лента заказов</h2>
      <div className={styles.data}>
        <OrderFeed
          data={responseData.data.orders}
        />
        <ScoreBoard
          data={responseData.data}
        />
      </div>
    </section>
  )
}