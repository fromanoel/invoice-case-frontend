"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./UserProfile";
import styles from "./invoiceHistory.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/app/_app";
import { useEffect, useState } from "react";

export default function InvoiceHistory({
  onFileChange,
  onSelectInvoice,
}: {
  onFileChange: (file: File | null) => void;
  onSelectInvoice: (invoice: { id: string; originalName: string; filePath: string }) => void;
}) {
  const [invoices, setInvoices] = useState<{ id: string; originalName: string; filePath: string }[]>([]);

  const getInvoices = async () => {
    try {
      const response = await axiosInstance.get("/document");
      setInvoices(response.data.map((invoice: any) => ({
        id: invoice.id,
        originalName: invoice.originalName,
        filePath: invoice.filePath, 
      })));
    } catch (error) {
      console.error("Erro ao buscar invoices:", error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

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
          {invoices.map((invoice) => (
            <li key={invoice.id} onClick={() => onSelectInvoice(invoice)}>
              <a href="#">{invoice.originalName}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}