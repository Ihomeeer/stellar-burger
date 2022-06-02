import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/ModalOrderInfo/ModalOrderInfo";
import { WSConnectionStartAction } from "../../services/actions/wsActions";
import { getUser } from "../../services/actions/user";
import { useParams } from 'react-router-dom';
import styles from './OrderDetailsPage.module.css';


export const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(WSConnectionStartAction());
  }, [dispatch]);

  return (
    <div className={styles.section}>
      <ModalOrderInfo
        urlId={id}
      />
    </div>
  )
}