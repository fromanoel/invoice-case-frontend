"use client";
import styles from "./UploadInvoice.module.css";

export default function UploadInvoice({
  imagePreview,
  isFileUploaded,
}: {
  imagePreview: string | null;
  isFileUploaded: boolean;
}) {
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
          </div>
        )}
      </div>

      <div className={styles.uploadInvoiceInteraction}>
        <label>
          <textarea
            className={styles.uploadInvoiceTextarea}
            placeholder="Upload an invoice to start."
            disabled={!isFileUploaded} 
          ></textarea>
        </label>
        <button
          className={styles.sendButton}
          disabled={!isFileUploaded}
        >
          Send
        </button>
      </div>
    </section>
  );
}