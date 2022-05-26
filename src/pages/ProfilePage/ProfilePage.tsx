import React, { FC, ChangeEvent, FormEvent } from 'react';
import { TUserState } from '../../utils/types/types';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { updateUser } from '../../services/actions/user';
import styles from './ProfilePage.module.css';
import { deleteUser, clearSessionTerminationStateAction } from '../../services/actions/user';

const ProfilePage: FC = () => {
  const { user } = useSelector(
    (state: RootStateOrAny): TUserState => state.user
  );

  const dispatch = useDispatch();
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [buttonsDisabled, setButtonsDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user.name) {
      resetForm();
    }
    // eslint-disable-next-line
  }, [user.name]);

  React.useEffect(() => {
    handleButtonsDisable()
    // eslint-disable-next-line
  }, [name, email])

  // Приведение инпутов к дефолтному значению, т.е. к актуальным имени и адресу. Пароль для красоты.
  const resetForm = (): void => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const userData: { name?: string; email?: string; } = {}
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
    dispatch(clearSessionTerminationStateAction())
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
        />
        <Input
          type="email"
          icon="EditIcon"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="text"
          icon="EditIcon"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className={styles.buttonsContainer}>
          {
            buttonsDisabled
              ?
              <></>
              :
              <>
                {/* Придется влепить пару игноров, потому что у кнопок нет пропса ClassName в теории, но он тут нужен, потому что их стилизирует */}
                { /* @ts-ignore */}
                <Button className={styles.button} onClick={resetForm} type="secondary" >Отмена</Button>
                { /* @ts-ignore */}
                <Button className={`${styles.button} ${styles.submitButton}`} type="primary" >Сохранить</Button>
              </>
          }
        </div>
      </form>
    </section>
  )
}

export default ProfilePage;