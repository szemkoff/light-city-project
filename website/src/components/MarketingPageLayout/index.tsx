import React from 'react';
import PageLayout from '../PageLayout';
import styles from './styles.module.css';

export interface MarketingPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function MarketingPageLayout({
  title,
  subtitle,
  children,
}: MarketingPageLayoutProps): JSX.Element {
  return (
    <PageLayout title={title} description={subtitle}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.prose}>{children}</div>
      </section>
    </PageLayout>
  );
}
