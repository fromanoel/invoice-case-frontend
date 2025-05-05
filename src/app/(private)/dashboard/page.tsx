
import InvoiceHistory from "@/components/dashboard/InvoiceHistory";
import UploadInvoice from "@/components/dashboard/UploadInvoice";
import styles from "./page.module.css";

export default  function Dashboard() {


  return (
    <main className={styles.invoiceMainContainer}>
      <InvoiceHistory />
      <UploadInvoice />
    </main>
  );
}