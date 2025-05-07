import SignUpForm from "@/components/auth/SignUpForm";
import styles from "@/app/(public)/page.module.css";
import Image from "next/image";

export default function SignUp() {
  return (
    <main className={styles.authPage}>
      <div className={styles.authContainer}>
        <SignUpForm />
        <Image src="/11514751.jpg" alt="Illustration of a woman reading invoice" width={400} height={600}/>
      </div>
    </main>
  );
}
