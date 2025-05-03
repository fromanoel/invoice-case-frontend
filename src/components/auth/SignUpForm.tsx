"use client";
import WelcomePage from "./WelcomeMessage";
import styles from "./FormStyles.module.css";
import ButtonForm from "./ButtonForm";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <section className={styles.authFormContainer}>
      <WelcomePage title="Sign Up" subtitle="Start taking control of your invaces." />
      <form className={styles.formContainer}>
        <label className={styles.label}>
          <input type="text" className={styles.input} placeholder="Name"/>
        </label>
        <label className={styles.label}>
          <input type="text" className={styles.input} placeholder="Username" />
        </label>
        <label className={styles.label}>
          <input type="password" className={styles.input} placeholder="Password"/>
        </label>
        <label className={styles.label}>
          <input type="password" className={styles.input} placeholder="Confirm your password"/>
        </label>
      </form>
      <ButtonForm/>

      <p className={styles.linkText}>
        Ready to{" "}
        <Link href="/" className={styles.link}>
          Login
        </Link>
      </p>
    </section>
  );
}