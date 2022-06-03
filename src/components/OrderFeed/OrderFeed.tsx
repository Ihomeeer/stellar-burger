import React, { FC } from 'react';
import { OrderCard } from '../OrderCard/OrderCard';
import { Link, useLocation } from "react-router-dom";
import styles from './OrderFeed.module.css';


export const OrderFeed: any = (props: any) => {
  const location = useLocation<Location>();

  return (
    <section className={`${styles.section} ${props.isFeed ? styles.personalSection : ''}`}>
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
                <Link to={{
                  pathname: `${props.pathname}${item._id}`,
                  state: { background: location }
                }}
                  key={item._id}
                  className={styles.link}
                >
                  <OrderCard
                    order={item}
                  />
                </Link>

              </li>
            )
          })
        }

      </ul>
    </section>
  )
}