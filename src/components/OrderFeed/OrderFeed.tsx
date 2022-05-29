import { FC } from 'react';
import { OrderCard } from '../OrderCard/OrderCard';

import styles from './OrderFeed.module.css';

export const OrderFeed: any = (props: any) => {
  // console.log(props)
  return (
    <section className={styles.section}>
      {
        props.isFeed
          ?
          <h2 className={styles.header}>Лента заказов</h2>
          :
          null
      }
      <ul className={styles.list}>
        {
          props.data && props.data.map(function (item: any) {
            return (
              <li key={item._id}>
                <OrderCard
                  order={item}
                />
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}