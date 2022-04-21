import styles from './LoginPage.module.css';
import EnteringForm from '../../components/EnteringForm/EnteringForm';
import { Input, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const LoginPage = () => {
  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Вход"
        buttonTitle="Войти"
      >
        <Input
          type="email"
          name="email"
          size="default"
          placeholder="E-mail"
        />
        <div className="mt-6 mb-6">
          <Input
            type="password"
            name="password"
            size="default"
            icon="ShowIcon"
            placeholder="Пароль"
          />
        </div>


      </EnteringForm>
    </section>
  )
}

export default LoginPage;