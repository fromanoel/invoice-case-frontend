import styles from "./UploadInvoice.module.css";

export default function UploadInvoice() {
  return (
    /* Section para fazer upload, fazer perguntas e interagir com a IA */
    <section className={styles.uploadInvoiceSection}>
      <h3>Current Invoice</h3>
      <div className={styles.uploadInvoiceResult}>
        <p>Add an invoice to start</p>
        <button className={styles.uploadButton}>Upload invoice</button>
      </div>
      <div className={styles.uploadInvoiceInteraction}>
        <label>
        <textarea
            className={styles.uploadInvoiceTextarea}
            placeholder="Upload an invoice to start."
        ></textarea>
        </label>
        <button className={styles.sendButton}>
          Enviar
        </button>
      </div>
    </section>
  );
}
