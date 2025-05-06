"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./UserProfile";
import styles from "./invoiceHistory.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InvoiceHistory({
  onFileChange,
  onSelectInvoice,
  invoices = [],
}: {
  onFileChange: (file: File | null) => void;
  onSelectInvoice: (invoice: { id: string; originalName: string; filePath: string }) => void;
  invoices?: { id: string; originalName: string; filePath: string }[];
}) {


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <section className={styles.invoiceHistorySection}>
      <UserProfile />
      <div>
        <div className={styles.invoiceHistoryAndButton}>
          <h3>Invoice History</h3>
          <input
            id="fileInput"
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={handleFileChange}
            className={styles.uploadButton}
          />
          <label htmlFor="fileInput" className={styles.customFileLabel}>
            <FontAwesomeIcon icon={faPlus} />
          </label>
        </div>
        <ul>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <li key={invoice.id} onClick={() => onSelectInvoice(invoice)}>
                <a href="#">{invoice.originalName}</a>
              </li>
            ))
          ) : (
            <li>No invoices available.</li> // Mensagem caso não haja invoices
          )}
        </ul>
      </div>
    </section>
  );
}