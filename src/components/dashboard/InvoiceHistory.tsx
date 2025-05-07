"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./UserProfile";
import styles from "./InvoiceHistory.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function InvoiceHistory({
  onFileChange,
  onSelectInvoice,
  invoices = [],
}: {
  onFileChange: (file: File | null) => void;
  onSelectInvoice: (invoice: {
    id: string;
    originalName: string;
    filePath: string;
  }) => void;
  invoices?: { id: string; originalName: string; filePath: string }[];
}) {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setIsLoading(true); // Ativa o estado de carregamento
      await onFileChange(file); // Aguarda o processamento do arquivo
      setIsLoading(false); // Desativa o estado de carregamento
    }
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
        <div className={styles.invoiceListContainer}>
          {isLoading ? ( // Exibe o status de carregamento
            <p>Loading...</p>
          ) : (
            <ul>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <li key={invoice.id} onClick={() => onSelectInvoice(invoice)}>
                    <a href="#">
                      {invoice.originalName.length > 20
                        ? `${invoice.originalName.slice(0, 24)}...`
                        : invoice.originalName}
                    </a>
                  </li>
                ))
              ) : (
                <li>No invoices available.</li> // Mensagem caso não haja invoices
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}