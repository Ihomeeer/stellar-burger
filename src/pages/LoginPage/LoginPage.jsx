import React from 'react';
import styles from './LoginPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';


const LoginPage = () => {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { isLoggedIn, loginError } = useSelector(
    state => state.user
  );

  React.useEffect(() => {
    if (isLoggedIn) {
      if (location?.state?.from?.pathname) {
        history.replace({ pathname: location?.state?.from?.pathname })
      } else {
        history.replace({ pathname: "/" })
      }
    }
  }, [isLoggedIn])


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