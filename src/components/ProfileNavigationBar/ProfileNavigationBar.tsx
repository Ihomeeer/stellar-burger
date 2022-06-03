import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProfileNavigationBar.module.css';
import { deleteUser, clearSessionTerminationStateAction } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks';



export const ProfileNavigationBar: any = (props: any) => {


  const handleExit = () => {
    dispatch(deleteUser());
    dispatch(clearSessionTerminationStateAction())
  }

  const dispatch = useDispatch();
  return (
    <nav className={styles.navBar}>
      <NavLink to="/profile" className={styles.navLink} activeClassName={styles.navLinkActive}>
        Профиль
      </NavLink>

      <NavLink to="/profile/orders" className={styles.navLink} activeClassName={styles.navLinkActive}>
        История заказов
      </NavLink>

      <NavLink to="/login" className={styles.navLink} activeClassName={styles.navLinkActive} onClick={handleExit}>
        Выход
      </NavLink>

      <p className={`text_type_main-default text_color_inactive mt-20 ${styles.hint}`}>
         {props.hint}
      </p>
    </nav>
  )
}