import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './EnteringForm.module.css';
import { TEnteringForm } from '../../utils/types';

const EnteringForm: FC<TEnteringForm> = ({ children, onSubmit, formTitle, buttonTitle }) => {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium mb-6">{formTitle}</h1>
        {children}
        <Button>{buttonTitle}</Button>

        {
          formTitle === "Вход"
            ?
            <>
              <div className={`${styles.textContainer} ${styles.textContainerFirst}`}>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
              </div>
              <div className={styles.textContainer}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
              </div>
            </>
            :
            formTitle === "Регистрация"
              ?
              <div className={`${styles.textContainer} ${styles.textContainerFirst}`}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Link to="/login" className={styles.link}>Войти</Link>
              </div>
              :
              <div className={`${styles.textContainer} ${styles.textContainerFirst}`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to="/login" className={styles.link}>Войти</Link>
              </div>
        }
      </form>
    </div>
  )
}

export default EnteringForm;