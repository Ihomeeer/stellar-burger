import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/ModalOrderInfo/ModalOrderInfo";

import { useParams } from 'react-router-dom';
import styles from './OrderDetailsPage.module.css';


export const OrderDetailsPage = () => {
  return (
    <div className={styles.section}>
      <ModalOrderInfo
        isPage={true}
      />
    </div>
  )
}