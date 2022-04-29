import React from 'react';
import styles from './LoginPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { login, CLEAR_LOGIN_STATE, SET_USER_LOGGED_IN_STATE } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const { login_success, loginError, isLoggedIn } = useSelector(
    state => state.user
  );

  // React.useEffect(() => {
  //   if (login_success) {
  //     history.replace({ pathname: '/' })
  //     // dispatch({ type: CLEAR_LOGIN_STATE })
  //     dispatch(
  //       {
  //         type: SET_USER_LOGGED_IN_STATE,
  //         isLoggedIn: true
  //       }
  //     )
  //   }
  // }, [history, login_success, dispatch])





  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log('в логине')
  //     history.replace({ pathname: '/' })
  //   }
  // }, [history, isLoggedIn, dispatch])





  if (getCookie('token')) {
    return (
      <Redirect to='/' />
    )
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const clearState = () => {
    setEmail('');
    setPassword('');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    clearState();
  }

  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Вход"
        buttonTitle="Войти"
        onSubmit={onSubmit}
      >
        <div className={styles.inputContainer}>
          <Input
            type="email"
            name="email"
            size="default"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className={`mt-6 mb-6 ${styles.inputContainer}`}>
          <Input
            type="password"
            name="password"
            size="default"
            icon="ShowIcon"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </EnteringForm>
      <p className={styles.error}>{loginError && loginError}</p>
    </section>
  )
}

export default LoginPage;