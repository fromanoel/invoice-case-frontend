"use client";
import InvoiceHistory from "@/components/dashboard/InvoiceHistory";
import UploadInvoice from "@/components/dashboard/UploadInvoice";
import { useEffect, useState } from "react";
import styles from "@/app/(private)/dashboard/page.module.css";
import axiosInstance from "@/app/_app";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
    getInvoices(); // <- Chamada inicial para buscar invoices
  }, []);

  const checkAuthentication = async () => {
    try {
      await axiosInstance.get("/verifyToken"); // Endpoint para validar os cookies
    } catch (error) {
      console.error("User not authenticated:", error);
      router.push("/"); // Redireciona para a página de login
    }
  };


  const [selectedInvoice, setSelectedInvoice] = useState<{
    id: string;
    originalName: string;
    filePath: string;
  } | null>(null);

  const [invoices, setInvoices] = useState<{ id: string; originalName: string; filePath: string }[]>([]);

  type Invoice = {
    id: string;
    originalName: string;
    filePath: string;
  };


  const getInvoices = async () => {
    try {
      const response = await axiosInstance.get("/document");
      setInvoices(
        response.data.map((invoice: Invoice) => ({
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

      await getInvoices();
      try{
        const res = await axiosInstance.get(`/document/${response.data.id}/interaction`)
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
