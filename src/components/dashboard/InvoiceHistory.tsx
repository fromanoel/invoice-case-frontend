import UserProfile from "./UserProfile";
import styles from "./invoiceHistory.module.css";
export default function InvoiceHistory() {
  return (
    <section className={styles.invoiceHistorySection}>
      <UserProfile />
      <div>
        <h3>Invoice History</h3>
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
