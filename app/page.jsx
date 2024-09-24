'use client';
import { useContext } from 'react';

import SignupLogin from './widgets/auth/Index';
import styles from './page.module.css';
import Products from './widgets/productBacklogs/ProductBackLogs';

export default function Home({ user }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SignupLogin />
        <Products
          widgetName={'ProductBackLogs'}
          // id={ uuidv4()}
          collection={'productBackLogs'}
          active={true}
          uiContext={'productBackLogsSelector'}
          startUpWidgetLayout={'card'}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
