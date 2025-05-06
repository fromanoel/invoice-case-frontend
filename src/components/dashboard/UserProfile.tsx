"use client";
import { useEffect, useState } from "react";
import styles from "./userProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/app/_app";

export default function UserProfile() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState(""); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmitLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/logout", null);
      console.log("Logout Sucessful: ", response.data);
    
      
      router.push("/");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user/me");
        const fullName = res.data.name;
        const first = fullName?.split(" ")[0];
        setFirstName(first); // Atualiza o estado com o primeiro nome
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };
  

    fetchUser();
  }, []);

  return (
    <section className={styles.userProfileSection}>
      <div className={styles.userProfileContainer}>
        <h1>myWebSiteName Dashboard</h1>
        <h2 onClick={toggleMenu} className={styles.username}>
          Welcome, {firstName}
          <FontAwesomeIcon icon={faChevronDown} style={{ width: "1.7rem" }}></FontAwesomeIcon>
        </h2>

        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.logoutButton} onClick={handleSubmitLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </section>
  );
}