import React, { FC } from 'react';
import { OrderCard } from '../OrderCard/OrderCard';
import { Link, useLocation } from "react-router-dom";
import styles from './OrderFeed.module.css';


export const OrderFeed: any = (props: any) => {
  const location = useLocation<Location>();

  console.log(props.isFeed)

  return (
    <section className={`${styles.section}`}>
      <ul className={`${styles.list} ${!props.isFeed && styles.listPersonal}`}>
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