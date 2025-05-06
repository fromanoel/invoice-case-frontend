"use client";
import InvoiceHistory from "@/components/dashboard/InvoiceHistory";
import UploadInvoice from "@/components/dashboard/UploadInvoice";
import { useState } from "react";
import styles from "@/app/(private)/dashboard/page.module.css";
import axiosInstance from "@/app/_app";

export default function Dashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<{
    id: string;
    originalName: string;
    filePath: string;
  } | null>(null);

  const [invoices, setInvoices] = useState<{ id: string; originalName: string }[]>([]);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    // Faz o upload do arquivo para o backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/document/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualiza o estado local de invoices com o novo arquivo
      const newInvoice = {
        id: response.data.id, // ID retornado pelo backend
        originalName: response.data.originalName, // Nome original do arquivo
        filePath: response.data.filePath, // Caminho do arquivo
      };

      setInvoices((prevInvoices) => [...prevInvoices, newInvoice]); // Adiciona o novo arquivo ao estado
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  return (
    <div className={styles.invoiceMainContainer}>
      <InvoiceHistory
        onFileChange={handleFileChange}
        onSelectInvoice={setSelectedInvoice} // Passa a função para selecionar o documento
      />
      <UploadInvoice selectedInvoice={selectedInvoice} />
    </div>
  );
}