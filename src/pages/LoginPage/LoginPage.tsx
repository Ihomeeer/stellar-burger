import React, { FC, ChangeEvent, FormEvent } from 'react';
import { TUserState, THistory, TLocation } from '../../utils/types/types';
import styles from './LoginPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks';
import { useLocation, useHistory } from 'react-router-dom';


const LoginPage: FC = () => {
  let location = useLocation<TLocation>();
  const history = useHistory<THistory>();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { isLoggedIn, loginError } = useSelector(
    (state): TUserState => state.user
  );

  React.useEffect(() => {
    if (isLoggedIn) {
      if (location?.state?.from?.pathname) {
        console.log(location?.state?.from?.pathname)
        history.replace({ pathname: location?.state?.from?.pathname })
      } else {
        history.replace({ pathname: "/" })
      }
    }
    // eslint-disable-next-line
  }, [isLoggedIn])


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const clearState = (): void => {
    setEmail('');
    setPassword('');
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
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