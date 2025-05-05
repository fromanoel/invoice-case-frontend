"use client";
import WelcomePage from "./WelcomeMessage";
import styles from "./FormStyles.module.css";
import ButtonForm from "./ButtonForm";
import Link from "next/link";

export default function LoginForm() {
  return (
    <section className={styles.authFormContainer}>
      <WelcomePage title="Welcome Back" subtitle="The best invoice reader is ready to help you." />
      <form className={styles.form}>
        <label className={styles.label}>
          <input type="text" className={styles.input} placeholder="Username"/>
        </label>
        <label className={styles.label}>
          <input type="password" className={styles.input} placeholder="Password"/>
        </label>
        <ButtonForm/>
      </form>


      <p className={styles.linkText}>
        Don't have an account?{" "}
        <Link href="/sign-up" className={styles.link}>
          Sign Up
        </Link>
      </p>
    </section>
  );
}