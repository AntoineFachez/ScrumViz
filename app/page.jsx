'use client';
import { useContext } from 'react';

import SignupLogin from './widgets/auth/Index';
import styles from './page.module.css';

export default function Home({ user }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SignupLogin />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
