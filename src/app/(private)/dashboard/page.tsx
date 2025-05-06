"use client";
import InvoiceHistory from "@/components/dashboard/InvoiceHistory";
import UploadInvoice from "@/components/dashboard/UploadInvoice";
import { useEffect, useState } from "react";
import styles from "@/app/(private)/dashboard/page.module.css";
import axiosInstance from "@/app/_app";

export default function Dashboard() {
  useEffect(() => {
    getInvoices(); // <- Chamada inicial para buscar invoices
  }, []);

  const [selectedInvoice, setSelectedInvoice] = useState<{
    id: string;
    originalName: string;
    filePath: string;
  } | null>(null);

  const [invoices, setInvoices] = useState<{ id: string; originalName: string; filePath: string }[]>([]);


  const getInvoices = async () => {
    try {
      const response = await axiosInstance.get("/document");
      setInvoices(
        response.data.map((invoice: any) => ({
          id: invoice.id,
          originalName: invoice.originalName,
          filePath: invoice.filePath,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar invoices:", error);
    }
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    // Faz o upload do arquivo para o backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        "/document/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Atualiza o estado local de invoices com o novo arquivo
      const newInvoice = {
        id: response.data.id, // ID retornado pelo backend
        originalName: response.data.originalName, // Nome original do arquivo
        filePath: response.data.filePath, // Caminho do arquivo
      };

      console.log("responsedataid ",response.data.id);

      await getInvoices();
      try{
        const res = await axiosInstance.get(`/document/${response.data.id}/interaction`)
        console.log("res data ", res.data);
        setSelectedInvoice(res.data);
      }
     catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  } catch{}
  };

  return (
    <div className={styles.invoiceMainContainer}>
      <InvoiceHistory
        onFileChange={handleFileChange}
        onSelectInvoice={setSelectedInvoice}
        invoices={invoices}
      />

      <UploadInvoice selectedInvoice={selectedInvoice} />
    </div>
  );
}
