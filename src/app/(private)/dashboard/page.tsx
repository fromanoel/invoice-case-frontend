"use client";
import InvoiceHistory from "@/components/dashboard/InvoiceHistory";
import UploadInvoice from "@/components/dashboard/UploadInvoice";
import { useState } from "react";
import styles from "@/app/(private)/dashboard/page.module.css";
import axiosInstance from "@/app/_app"; 

export default function Dashboard() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const allowedTypes = ["image/png", "image/svg+xml", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        return console.log("Tipo de arquivo não aceito!");
      }
      setImagePreview(URL.createObjectURL(file));
      setIsFileUploaded(true);

      handleFileUpload(file); // Envia ao backend após validação
    } else {
      setImagePreview(null);
      setIsFileUploaded(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/document/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resposta do backend:", response.data);

      // Atualiza a InvoiceHistory depois que o upload termina
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  return (
    <div className={styles.invoiceMainContainer}>
      <InvoiceHistory
        onFileChange={handleFileChange}
        refreshTrigger={refreshTrigger} // força atualização do filho
      />
      <UploadInvoice imagePreview={imagePreview} isFileUploaded={isFileUploaded} />
    </div>
  );
}
