"use client";
import WelcomePage from "./WelcomeMessage";
import styles from "./FormStyles.module.css";
import ButtonForm from "./ButtonForm";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/_app";
export default function SignUpForm() {
  const router = useRouter();
  const handleSubmitSignUp = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axiosInstance.post("/user", {
        name,
        username,
        password,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed.");
    }
  };

  return (
    <section className={styles.authFormContainer}>
      <WelcomePage title="Sign Up" subtitle="Start taking control of your invaces." />
      <form className={styles.formContainer} onSubmit={handleSubmitSignUp}>
        <label className={styles.label}>
          <input type="text" className={styles.input} name="name" placeholder="Name" />
        </label>
        <label className={styles.label}>
          <input type="text" className={styles.input} name="username" placeholder="Username" />
        </label>
        <label className={styles.label}>
          <input type="password" className={styles.input} name="password" placeholder="Password" />
        </label>
        <label className={styles.label}>
          <input
            type="password"
            className={styles.input}
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </label>
        <ButtonForm />
      </form>

      <p className={styles.linkText}>
        Ready to{" "}
        <Link href="/" className={styles.link}>
          Login
        </Link>
      </p>
    </section>
  );
}