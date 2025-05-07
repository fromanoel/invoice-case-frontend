"use client";
import WelcomePage from "./WelcomeMessage";
import styles from "./FormStyles.module.css";
import ButtonForm from "./ButtonForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/_app";
import { useState } from "react";
export default function SignUpForm() {
  const router = useRouter();
  const [authenticationError, setAuthenticationError] = useState<string>("");
  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Regex para verificar senha forte
    // Pelo menos 4 caracteres a 20 caracteres.
    // Pelo menos uma letra maiúscula.
    // Pelo menos uma letra minúscula.
    // Pelo menos um número.
    // Pelo menos um caractere especial.
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,20}$/;

    // Regex para verificar username forte
    // Pelo menos 4 caracteres
    const usernameRegex = /^.{4,}$/;

    //Regex para verificar se name contem numeros
    const nameContainsNumberRegex = /\d/;

    // Verifica se algum campo está vazio
    if (!name || !username || !password || !confirmPassword) {
      setAuthenticationError("All fields are required.");
      return;
    }

    // Regex para verificar se o nome contém números
    if (nameContainsNumberRegex.test(name)) {
      setAuthenticationError("Name cannot contain numbers.");
      return;
    }

    if (!usernameRegex.test(username)) {
      setAuthenticationError("Username must have at least 4 characters.");
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      setAuthenticationError(
        "Password must be at least 4 to 20 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    } 

    if (password !== confirmPassword) {
      setAuthenticationError("Passwords do not match.");
      return;
    }

    try {
      await axiosInstance.post("/user", {
        name,
        username,
        password,
      });
      console.log("tenta novamente");
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed.");
    }
  };

  return (
    <section className={styles.authFormContainer}>
      <WelcomePage
        title="Sign Up"
        subtitle="Start taking control of your invaces."
      />
      <form className={styles.formContainer} onSubmit={handleSubmitSignUp}>
        <label className={styles.label}>
          <input
            type="text"
            className={styles.input}
            name="name"
            placeholder="Name"
          />
        </label>
        <label className={styles.label}>
          <input
            type="text"
            className={styles.input}
            name="username"
            placeholder="Username"
          />
        </label>
        <label className={styles.label}>
          <input
            type="password"
            className={styles.input}
            name="password"
            placeholder="Password"
          />
        </label>
        <label className={styles.label}>
          <input
            type="password"
            className={styles.input}
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </label>
        {authenticationError ? (
          <p className={styles.errorText}>{authenticationError}</p>
        ) : (
          <p className={styles.errorText}>&nbsp;</p> // Espaço em branco para manter o layout
        )}
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
