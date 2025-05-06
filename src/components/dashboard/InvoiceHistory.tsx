"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./UserProfile";
import styles from "./invoiceHistory.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function InvoiceHistory() {

  const handleFileChange = () => {

  }
  return (
    <section className={styles.invoiceHistorySection}>
      <UserProfile />
      <div>
        <div className={styles.invoiceHistoryAndButton}>
        <h3>Invoice History</h3>
        <input id="fileInput" type="file" accept=".png,.svg" onChange={handleFileChange} className={styles.uploadButton}/>
        <label htmlFor="fileInput" className={styles.customFileLabel}>
        <FontAwesomeIcon icon={faPlus}/>
        </label>
        </div>
        
        <ul>
          <li>
            <a href="#">Invoice 1</a>
          </li>
          <li>
            <a href="#">Invoice 2</a>
          </li>
          <li>
            <a href="#">Invoice 3</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
