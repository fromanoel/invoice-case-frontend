import styles from "./WelcomeMessage.module.css";

interface WelcomePageProps {
  title: string;
  subtitle: string;
}

export default function WelcomePage({ title, subtitle }: WelcomePageProps) {
  return (
    <section className={styles.welcomeContainer}>
      <small className={styles.siteName}>MyWebSite</small>
      <h1 className={styles.siteMainTitle}>{title}</h1>
      <h2 className={styles.siteMainSubtitle}>{subtitle}</h2>
    </section>
  );
}