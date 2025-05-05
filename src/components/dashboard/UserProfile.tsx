"use client";
import { useState } from "react";
import styles from "./userProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
export default function UserProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu state:", !isMenuOpen); // Verifica se o estado está mudando
  };

  return (
    <section className={styles.userProfileSection}>
      <div className={styles.userProfileContainer}>
        <h1>myWebSiteName Dashboard</h1>
        <h2 onClick={toggleMenu} className={styles.username}>
          Welcome, username
          <FontAwesomeIcon icon={faChevronDown} style={{width: "1.7rem"}}></FontAwesomeIcon>
        </h2>

        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.logoutButton}>Logout</button>
          </div>
        )}
      </div>
    </section>
  );
}
