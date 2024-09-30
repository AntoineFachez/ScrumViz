'use client';
import { useContext } from 'react';

import SignupLogin from './widgets/auth/Index';
import styles from './page.module.css';
import DigitalProducts from './widgets/productBacklogs/ProductBackLogs';
import AuthContext from './widgets/auth/AuthContext';

export default function Home({}) {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {user ? (
          <DigitalProducts
            widgetName={'ProductBackLogs'}
            // id={ uuidv4()}
            collection={'productBackLogs'}
            active={true}
            uiContext={'productBackLogsSelector'}
            startUpWidgetLayout={'card'}
          />
        ) : (
          <SignupLogin />
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
