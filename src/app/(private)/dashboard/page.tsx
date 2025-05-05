import {cookies} from "next/headers";
import InvoiceHistory from "@/components/dashboard/InvoiceHistory";
import UploadInvoice from "@/components/dashboard/UploadInvoice";
import styles from "./page.module.css";
export default async function Dashboard(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get("access_token");

    if(!authToken) {
        console.log("Redirecionando para Login");
    }
    return(
        <main className={styles.invoiceMainContainer}>
            <InvoiceHistory/>
            <UploadInvoice/>
        </main>
    );
}