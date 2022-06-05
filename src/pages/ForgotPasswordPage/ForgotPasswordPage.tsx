import React, { FC, ChangeEvent, FormEvent } from 'react';
import { TUserState } from '../../utils/types/types';
import styles from './ForgotPasswordPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/user';
import { clearForgotPasswordStateAction } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const dispatch = useDispatch();
  const history = useHistory<{ forgotPassword: true }>();
  const { forgot_password_success } = useSelector(
    (state): TUserState => state.user
  );

  React.useEffect(() => {
    if (forgot_password_success) {
      history.replace({ pathname: '/reset-password', state: { forgotPassword: true } })
      console.log(history)
      dispatch(clearForgotPasswordStateAction())
    }
  }, [history, forgot_password_success, dispatch])

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }

  if (getCookie('token')) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Восстановление пароля"
        buttonTitle="Восстановить"
        onSubmit={onSubmit}
      >
        <div className="mb-6">
          <Input
            type="email"
            name="email"
            size="default"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

      </EnteringForm>
    </section>
  )
}

export default ForgotPasswordPage;