import React, { FC, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPassword, CLEAR_RESET_PASSWORD_STATE } from '../../services/actions/user';
import styles from './ResetPasswordPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TUserState, THistory } from '../../utils/types';


const ResetPasswordPage: FC = () => {

  const [password, setPassword] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const dispatch = useDispatch();
  const history = useHistory<THistory>();
  const { reset_password_success } = useSelector(
    (state: RootStateOrAny): TUserState => state.user
  );

  React.useEffect(() => {
    if (reset_password_success) {
      history.replace({ pathname: '/login' })
      dispatch({ type: CLEAR_RESET_PASSWORD_STATE })
    }
  }, [history, reset_password_success, dispatch])

  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  }

  React.useEffect(() => {
    if (history?.location?.pathname === '/reset-password' && !history?.location?.state?.forgotPassword) {
      history.replace({ pathname: '/login' })
    }
    // eslint-disable-next-line
  }, [history.location.pathname])


  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Восстановление пароля"
        buttonTitle="Восстановить"
        onSubmit={onSubmit}
      >
        <div className="mb-6">
          <Input
            type="password"
            name="password"
            size="default"
            icon="ShowIcon"
            placeholder="Введите новый пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mt-6 mb-6">
          <Input
            type="text"
            name="text"
            size="default"
            placeholder="Введите код из письма"
            value={token}
            onChange={handleTokenChange}
          />
        </div>
      </EnteringForm>
    </section>
  )
}

export default ResetPasswordPage;