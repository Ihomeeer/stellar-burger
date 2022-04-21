import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './EnteringForm.module.css';

const EnteringForm = ({ children, onSubmit, formTitle, buttonTitle }) => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">{formTitle}</h1>
        {children}
        <Button>{buttonTitle}</Button>
      </form>
      {
        formTitle = "Вход"
          ?
          <>
            <div className={`${styles.textContainer} ${styles.textContainerFirst}`}>
              <p className="text text_type_main-default">Вы — новый пользователь?</p>
              <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
            </div>
            <div className={styles.textContainer}>
              <p className="text text_type_main-default">Забыли пароль?</p>
              <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
            </div>
          </>
          :
          <div className={styles.textContainer}>
            <p className="text text_type_main-default mt-20">Уже зарегистрированы?</p>
            <Link to="/forgot-password" className={styles.link}>Войти</Link>
          </div>
      }
    </div>
  )
}

export default EnteringForm;