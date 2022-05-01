import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.header}>
        Ошибка 404
      </h1>
      <p className={styles.text}>
        Тут ничего нет :(
      </p>
      <Link to="/" className={styles.link}>Ну и ладно, не очень и хотелось</Link>
    </section>
  )
}