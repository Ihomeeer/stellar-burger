import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/ModalOrderInfo/ModalOrderInfo";
import styles from './OrderDetailsPage.module.css';
import { WSConnectionStartAction, WSConnectionClosedAction } from "../../services/actions/wsActions";


export const OrderDetailsPage = () => {
const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('start modal')
    dispatch(WSConnectionStartAction('/all'));
  return() => {
    console.log('return modal')
    dispatch(WSConnectionClosedAction());
  }
}, [dispatch])

  return (
    <div className={styles.section}>
      <ModalOrderInfo
        isPage={true}
      />
    </div>
  )
}