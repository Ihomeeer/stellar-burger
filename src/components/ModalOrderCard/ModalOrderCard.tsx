import React, { FC } from 'react';
import styles from './ModalOrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { ScoreBoard } from '../../components/ScoreBoard/ScoreBoard';
import { responseData } from '../../utils/data';
import { useSelector } from '../../services/hooks';
import { TAllIngredientsState } from '../../utils/types/types';
import { v4 as generateUid } from 'uuid';
import { produceWithPatches } from 'immer';

export const ModalOrderCard = (props: any) => {
  return (
    <div className={`${styles.card} mb-4`}>
      <div className={`${styles.imageContainer} mr-3`}>
        <img className={styles.image} src={props.item.image_mobile} alt={props.item.name} />
      </div>
      <p className={`${styles.name} text text_type_main-small`}>{props.item.name}</p>
      <div className={styles.currencyContainer}>
        <p className={`${styles.amount} mr-1 text text_type_digits-default`}>{props.amount} x</p>
        <p className={`${styles.currency} ml-1 mr-2 text text_type_digits-default`}>{props.currency}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}