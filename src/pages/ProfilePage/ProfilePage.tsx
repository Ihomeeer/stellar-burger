import { FC } from 'react';
import { ProfileNavigationBar } from '../../components/ProfileNavigationBar/ProfileNavigationBar';
import { TProfilePage } from '../../utils/types/types';
import styles from './ProfilePage.module.css';


const ProfilePage: FC<TProfilePage> = ({ children, hint }) => {

  return (
    <section className={styles.section}>
      <ProfileNavigationBar
        hint={hint}
      />
      {children}
    </section>
  )
}

export default ProfilePage;