import LoginForm from "@/components/auth/LoginForm";
import styles from "@/app/(public)/page.module.css";
import Image from "next/image";


export default function Login() {
  return <main className={styles.authPage}>
    <div className={styles.authContainer}>
    <LoginForm />
    <Image src="/illustrationInvoice.jpg" alt="An illustration of a woman reading invoices" width={400} height={600}/>
    </div>
  </main>
  

}
