import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/ModalOrderInfo/ModalOrderInfo";

import { useParams } from 'react-router-dom';
import styles from './OrderDetailsPage.module.css';
import { WSConnectionStartAction, WSConnectionClosedAction } from "../../services/actions/wsActions";


export const OrderDetailsPage = () => {
const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('start modal')
    dispatch(WSConnectionStartAction());
  return() => {
    console.log('return modal')
    dispatch(WSConnectionClosedAction());
  }
}, [])

  return (
    <div className={styles.section}>
      <ModalOrderInfo
        isPage={true}
      />
    </div>
  )
}