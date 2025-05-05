"use client";
import { useState } from "react";
import styles from "./UploadInvoice.module.css";

export default function UploadInvoice() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className={styles.uploadInvoiceSection}>
      <h3>Current Invoice</h3>

      <div className={styles.uploadInvoiceResult}>
        {imagePreview ? (
          <img src={imagePreview} alt="Invoice preview" className={styles.previewImage} />
        ) : (
          <div>
            <p>Add an invoice to start</p>
            <input
              className={styles.uploadButton}
              type="file"
              accept=".png,.svg"
              onChange={handleFileChange}
            />
          </div>
          
        )}
       
      </div>

      <div className={styles.uploadInvoiceInteraction}>
        <label>
          <textarea
            className={styles.uploadInvoiceTextarea}
            placeholder="Upload an invoice to start."
          ></textarea>
        </label>
        <button className={styles.sendButton}>Send</button>
      </div>
    </section>
  );
}
