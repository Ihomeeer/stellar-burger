import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {

  return (
    <section className={styles.section}>
      <nav className={styles.navBar}>
        <NavLink to="/profile" className={styles.navLink} activeClassName={styles.navLinkActive}>
          Профиль
        </NavLink>

        <NavLink to="/profile/orders" className={styles.navLink} activeClassName={styles.navLinkActive}>
          История заказов
        </NavLink>

        <NavLink to="/profile/orders/:id" className={styles.navLink} activeClassName={styles.navLinkActive}>
          Выход
        </NavLink>

        <p className={`text_type_main-default text_color_inactive mt-20 ${styles.hint}`}>
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </nav>
      <form className={styles.inputsForm}>
      <Input
            type="text"
            icon="EditIcon"
            name="name"
            placeholder="Имя"
          />
          <Input
            type="email"
            icon="EditIcon"
            name="email"
            placeholder="E-mail"
          />
          <Input
            type="password"
            icon="EditIcon"
            name="password"
            placeholder="Пароль"
          />
      </form>
    </section>
  )
}

export default ProfilePage;