import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/user';
import styles from './ProfilePage.module.css';
import { getUser, deleteUser } from '../../services/actions/user';
import { CLEAR_SESSION_TERMINATION_STATE } from '../../services/actions/user';

const ProfilePage = () => {
  const { user } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false);

  React.useEffect(() => {
    if (user.name) {
      resetForm();
    }
  }, [user.name]);

  React.useEffect(() => {
    handleButtonsDisable()
  }, [name, email])

  // Приведение инпутов к дефолтному значению, т.е. к актуальным имени и адресу. Пароль для красоты.
  const resetForm = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {}
    setButtonsDisabled(true);
    if (name !== user.name) {
      userData.name = name;
    }
    if (email !== user.email) {
      userData.email = email;
    }
    dispatch(updateUser(userData));
  }

  const handleButtonsDisable = () => {
    if (name !== user.name || email !== user.email) {
      setButtonsDisabled(false);
    } else {
      setButtonsDisabled(true);
    }
  }

  const handleExit = () => {
    dispatch(deleteUser());
    dispatch({
      type: CLEAR_SESSION_TERMINATION_STATE,
    })
  }

  return (
    <section className={styles.section}>
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
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </nav>
      <form className={styles.inputsForm} autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="text"
          icon="EditIcon"
          name="name"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
          autoComplete="off"
        />
        <Input
          type="email"
          icon="EditIcon"
          name="email"
          placeholder="E-mail"
          value={email}
          defaultValue={user?.email}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <Input
          type="text"
          icon="EditIcon"
          name="password"
          placeholder="Пароль"
          value={password}
          defaultValue={user?.password}
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        <div className={styles.buttonsContainer}>
          {
            buttonsDisabled
              ?
              <></>
              :
              <>
                <Button className={styles.button} onClick={resetForm} type="secondary" >Отмена</Button>
                <Button className={`${styles.button} ${styles.submitButton}`} type="primary" >Сохранить</Button>
              </>
          }
        </div>
      </form>
    </section>
  )
}

export default ProfilePage;