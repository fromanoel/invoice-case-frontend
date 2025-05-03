import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import styles from "@/app/(public)/page.module.css";

export default function SignUp() {
  return (
    <main className={styles.authPage}>
      <div className={styles.authContainer}>
        <SignUpForm />
        <Image src="/illustrationInvoice.jpg" alt="Illustration" width={400} height={600}/>
      </div>
    </main>
  );
}
