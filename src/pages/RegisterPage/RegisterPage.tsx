import React, { FC, ChangeEvent, FormEvent } from 'react';
import styles from './RegisterPage.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/user';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CLEAR_REGISTRATION_STATE } from '../../services/actions/user';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { TUserState, THistory } from '../../utils/types';

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const history = useHistory<THistory>();
  const { register_success, registerError } = useSelector(
    (state: RootStateOrAny): TUserState => state.user
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const clearState = (): void => {
    setEmail('');
    setName('');
    setPassword('');
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(register(name, email, password));
    clearState();
  }

  React.useEffect(() => {
    if (register_success) {
      history.replace({pathname: '/login'})
      dispatch({ type: CLEAR_REGISTRATION_STATE })
    }
    // eslint-disable-next-line
  }, [history, register_success])

  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Регистрация"
        buttonTitle="Зарегистрироваться"
        onSubmit={onSubmit}
      >
        <Input
          type="text"
          name="name"
          size="default"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <div className="mt-6 mb-6">
          <Input
            type="email"
            name="email"
            size="default"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mt-6 mb-6">
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
      <p className={styles.error}>{registerError && registerError}</p>
    </section>
  )
}

export default RegisterPage;