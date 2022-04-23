import React from 'react';
import styles from './ForgotPasswordPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { forgotPassword, CLEAR_FORGOT_PASSWORD_STATE } from '../../services/actions/user';

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { forgot_password_success } = useSelector(
    state => state.user
  );

  React.useEffect(() => {
    if (forgot_password_success) {
      history.replace({pathname: '/reset-password'})
      dispatch({ type: CLEAR_FORGOT_PASSWORD_STATE })
    }
  }, [history, forgot_password_success])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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