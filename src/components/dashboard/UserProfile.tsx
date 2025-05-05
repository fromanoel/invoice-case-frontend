"use client";
import { useState } from "react";
import styles from "./userProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function UserProfile() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu state:", !isMenuOpen); // Verifica se o estado está mudando
  };
   
  const handleSubmitLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3004/logout", null, {withCredentials: true});
      console.log("Logout Sucessful: ", response.data);
      router.push("/");
    } catch (error){
      console.error("Logout error: ", error);
    }
  }

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
            <button className={styles.logoutButton} onClick={handleSubmitLogout}>Logout</button>
          </div>
        )}
      </div>
    </section>
  );
}
