"use client";
import WelcomePage from "./WelcomeMessage";
import styles from "./FormStyles.module.css";
import ButtonForm from "./ButtonForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/_app";
export default function LoginForm() {
  const router = useRouter();
  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const username = formData.get("username");
    const password = formData.get("password");

    try{
      const response = await axiosInstance.post("/login", {
        username,
        password
      });
      router.push("/dashboard");
    } catch (error){
      console.log("Login error: ", error);
    }
    
  };
  return (
    <section className={styles.authFormContainer}>
      <WelcomePage title="Welcome Back" subtitle="The best invoice reader is ready to help you." />
      <form className={styles.form} onSubmit={handleSubmitLogin}>
        <label className={styles.label}>
          <input type="text" className={styles.input} name="username" placeholder="Username"/>
        </label>
        <label className={styles.label}>
          <input type="password" className={styles.input} name="password" placeholder="Password"/>
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