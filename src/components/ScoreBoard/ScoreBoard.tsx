import { FC } from 'react';
import React from 'react';
import styles from './ScoreBoard.module.css';
import { v4 as generateUid } from 'uuid';

export const ScoreBoard: any = (props: any) => {
  let doneOrders: any = null;
  let pendingOrders: any = null;

  const formatOrders = () => {
    doneOrders = props.data.orders.filter((item: any) => item.status === "done").map((item: any) => item.number).slice(0, 10);
    pendingOrders = props.data.orders.filter((item: any) => item.status === "pending").map((item: any) => item.number).slice(0, 10);
  }
  formatOrders()


  return (
    <section className={styles.section}>

      <div className={styles.listsContainer}>
        <div className={styles.ordersContainer}>
          <h3 className={`${styles.header} text text_type_main-medium mb-6`}>Готовы:</h3>
          <ul className={`${styles.list} ${styles.doneList}`}>
            {
              doneOrders !== null &&
              doneOrders.map((item: any) => {
                return (
                  <li key={item}>
                    <p className={`text text_type_digits-default`}>{item}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>


        <div className={styles.ordersContainer}>
          <h3 className={`${styles.header} text text_type_main-medium mb-6`}>В работе:</h3>
          <ul className={styles.list}>
          {
              pendingOrders !== null &&
              pendingOrders.map((item: any) => {
                return (
                  <li key={item}>
                    <p className={`text text_type_digits-default`}>{item}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div className={`${styles.dataContainer} mt-15`}>
        <h3 className={`${styles.header} text text_type_main-medium`}>Выполнено за все время:</h3>
        <p className={`${styles.number} text text_type_digits-large`}>{props.data.total}</p>
      </div>

      <div className={styles.dataContainer}>
        <h3 className={`${styles.header} text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <p className={`${styles.number} text text_type_digits-large`}>{props.data.totalToday}</p>
      </div>

    </section>
  )
}