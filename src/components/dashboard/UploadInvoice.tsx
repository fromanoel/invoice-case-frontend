"use client";
import { useState } from "react";
import styles from "./UploadInvoice.module.css";

export default function UploadInvoice() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);  // Estado para controle do upload

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setIsFileUploaded(true);  // Marca o arquivo como carregado
    } else {
      setIsFileUploaded(false);  // Se não houver arquivo, desmarca
    }
  };

  return (
    <section className={styles.uploadInvoiceSection}>
      <h3>Current Invoice</h3>

      <div className={styles.uploadInvoiceResult}>
        {imagePreview ? (
          <div className={styles.divSecundaria}>
            <div className={styles.imageDiv}>
            <img
              src={imagePreview}
              alt="Invoice preview"
              className={styles.previewImage}
            />
            </div>
            <div className={`${styles.chatContainer} ${styles.iaMessage}`}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
            <div className={`${styles.chatContainer} ${styles.userMessage}`}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
          </div>
        ) : (
          <div className={styles.uploadInvoiceBox}>
            <p>Add an invoice to start</p>
            <input
              id="file"
              className={styles.uploadButton}
              type="file"
              accept=".png,.svg"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className={styles.customFileLabel}>
              Choose File
            </label>
          </div>
        )}
      </div>

      <div className={styles.uploadInvoiceInteraction}>
        <label>
          <textarea
            className={styles.uploadInvoiceTextarea}
            placeholder="Upload an invoice to start."
            disabled={!isFileUploaded}  // Desabilita o textarea até que o arquivo seja carregado
          ></textarea>
        </label>
        <button
          className={styles.sendButton}
          disabled={!isFileUploaded}  // Desabilita o botão até que o arquivo seja carregado
        >
          Send
        </button>
      </div>
    </section>
  );
}