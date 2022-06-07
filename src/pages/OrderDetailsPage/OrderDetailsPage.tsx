import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/ModalOrderInfo/ModalOrderInfo";
import styles from './OrderDetailsPage.module.css';
import { WSConnectionStartAction, WSConnectionClosedAction } from "../../services/actions/wsActions";
import { getCookie } from "../../utils/cookie";
import { useLocation } from 'react-router-dom';


export const OrderDetailsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location.pathname)

  React.useEffect(() => {
    if (location.pathname.includes('profile')) {
      dispatch(WSConnectionStartAction(getCookie('token') as string));
    } else {
      dispatch(WSConnectionStartAction('/all'));
    }
    return () => {
      dispatch(WSConnectionClosedAction())
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