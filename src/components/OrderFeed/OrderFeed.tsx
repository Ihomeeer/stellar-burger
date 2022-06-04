import { FC } from 'react';
import { OrderCard } from '../OrderCard/OrderCard';
import { Link, useLocation } from "react-router-dom";
import styles from './OrderFeed.module.css';
import { TOrderFeed, TResponseOrderItem } from '../../utils/types/types';


export const OrderFeed: FC<TOrderFeed> = ({ data, pathname, isFeed }) => {
  const location = useLocation<Location>();

  return (
    <section className={`${styles.section}`}>
      <ul className={`${styles.list} ${!isFeed && styles.listPersonal}`}>
        {
          data && data.map(function (item: TResponseOrderItem) {
            return (
              <li key={item._id}>
                <Link to={{
                  pathname: `${pathname}${item._id}`,
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