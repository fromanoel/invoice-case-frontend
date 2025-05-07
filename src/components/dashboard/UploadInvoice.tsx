import { useEffect, useRef, useState } from "react";
import styles from "./UploadInvoice.module.css";
import axiosInstance from "@/app/_app";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function UploadInvoice({
  selectedInvoice,
}: {
  selectedInvoice: {
    id: string;
    originalName: string;
    filePath: string;
  } | null;
}) {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [interactions, setInteractions] = useState<
    {
      type: "question" | "answer";
      content: string;
      displayedContent?: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>(""); // Estado para o conteúdo do textarea
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para indicar carregamento
  const [messageSent, setMessageSent] = useState<boolean>(false); // Estado para controle do envio da mensagem

  const divSecundariaRef = useRef<HTMLDivElement | null>(null); // Referência para a divSecundaria

  const generatePDF = async () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();
    let yPosition = 10; // Posição inicial no PDF
    const pageHeight = 280; // Altura máxima da página antes de adicionar uma nova
    const margin = 10; // Margem de 10 unidades da esquerda
    const maxWidth = 180; // Largura máxima para a imagem (ajuste conforme necessário)
    const maxTextWidth = maxWidth; // Largura máxima para o texto (ajustado para o mesmo valor da imagem, mas pode ser alterado)

    // Adiciona o título
    doc.setFontSize(16);
    doc.text("Invoice Details", 10, yPosition);
    yPosition += 10;

    // Adiciona a imagem do documento
    const image = new Image();
    image.src = `https://invoice-case-backend.onrender.com/${selectedInvoice.filePath}`;

    image.onload = async () => {
      // Calcula a proporção da imagem
      const aspectRatio = image.height / image.width;
      // Calcula a altura proporcional com base na largura máxima
      const scaledHeight = maxWidth * aspectRatio;

      // Adiciona a imagem ao PDF com a largura ajustada e a altura proporcional
      doc.addImage(image, "JPEG", margin, yPosition, maxWidth, scaledHeight);

      yPosition += scaledHeight + 10; // Ajusta a posição vertical para o próximo conteúdo

      // Adiciona o texto extraído com espaçamento entre linhas
      doc.setFontSize(12);
      doc.text("Extracted Text:", 10, yPosition);
      yPosition += 10;

      const lines = (extractedText || "").split("\n");
      lines.forEach((line) => {
        if (line.trim() === "") return; // Ignora linhas vazias

        if (yPosition > pageHeight) {
          // Limite da página
          doc.addPage();
          yPosition = 10; // Reinicia a posição no topo da nova página
        }

        // Usa splitTextToSize para quebrar o texto corretamente
        const splitText = doc.splitTextToSize(line, maxTextWidth);
        splitText.forEach((textLine: string | string[]) => {
          doc.text(textLine, 10, yPosition);
          yPosition += 8; // Espaçamento entre as linhas
        });
      });

      // Adiciona as interações (perguntas e respostas)
      doc.text("Interactions:", 10, yPosition);
      yPosition += 10;

      interactions.forEach((interaction) => {
        const interactionLines = interaction.content.split("\n"); // Divide o conteúdo em linhas
        interactionLines.forEach((line) => {
          if (line.trim() === "") return; // Ignora linhas vazias

          if (yPosition > pageHeight) {
            // Limite da página
            doc.addPage();
            yPosition = 10; // Reinicia a posição no topo da nova página
          }

          // Adiciona Q: para perguntas e A: para respostas
          const prefix = interaction.type === "question" ? "Q:" : "A:";
          const splitInteraction = doc.splitTextToSize(
            `${prefix} ${line}`,
            maxTextWidth
          );

          splitInteraction.forEach((textLine: string | string[]) => {
            doc.text(textLine, 10, yPosition);
            yPosition += 8; // Espaçamento entre as linhas
          });
        });
      });

      // Salva o PDF
      doc.save(`${selectedInvoice.originalName}.pdf`);
    };
  };

  useEffect(() => {
    const fetchDocumentWithInteractions = async () => {
      if (selectedInvoice) {
        try {
          const response = await axiosInstance.get(
            `/document/${selectedInvoice.id}/interaction`
          );
          const { extractedText, interactions } = response.data;

          setExtractedText(extractedText || "");

          const mappedInteractions = interactions.flatMap(
            (interaction: any) => [
              { type: "question", content: interaction.question },
              { type: "answer", content: interaction.answer },
            ]
          );

          setInteractions(mappedInteractions || []);
        } catch (error) {
          console.error("Erro ao buscar documento com interações:", error);
          setExtractedText(null);
          setInteractions([]); // Reseta interactions em caso de erro
        }
      }
    };

    fetchDocumentWithInteractions();
  }, [selectedInvoice]);

  useEffect(() => {
    if (messageSent && divSecundariaRef.current) {
      divSecundariaRef.current.scrollTop =
        divSecundariaRef.current.scrollHeight;
      setMessageSent(false); // Reseta o estado após a rolagem
    }
  }, [messageSent, interactions]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedInvoice) return;

    // Adiciona a mensagem do usuário e os três pontos como feedback
    setInteractions((prevInteractions) => [
      ...prevInteractions,
      { type: "question", content: newMessage }, // Adiciona a pergunta do usuário
      { type: "answer", content: "...", displayedContent: "" }, // Adiciona os três pontinhos como feedback
    ]);

    setNewMessage(""); // Limpa o textarea imediatamente após o envio
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axiosInstance.post("/interaction", {
        documentId: selectedInvoice.id,
        question: newMessage, // Envia a mensagem como uma pergunta
      });

      const { answer } = response.data;

      setInteractions((prevInteractions) => {
        const updatedInteractions = [...prevInteractions];
        updatedInteractions[updatedInteractions.length - 1] = {
          type: "answer",
          content: answer,
          displayedContent: "", // Inicializa o texto exibido como vazio
        };
        simulateTyping(updatedInteractions.length - 1, answer); // Inicia o efeito de digitação
        return updatedInteractions;
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      // Remove os três pontinhos em caso de erro
      setInteractions((prevInteractions) => prevInteractions.slice(0, -1));
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
      setMessageSent(true); // Marca que a mensagem foi enviada para acionar a rolagem
    }
  };

  const simulateTyping = (index: number, text: string) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setInteractions((prevInteractions) => {
        const updatedInteractions = [...prevInteractions];
        const currentInteraction = updatedInteractions[index];

        // Verifica se o texto ainda está sendo digitado
        if (currentIndex < text.length) {
          currentInteraction.displayedContent = text.slice(0, currentIndex + 1); // Atualiza o texto exibido até o índice atual
          currentIndex++;
        } else {
          clearInterval(interval); // Para o intervalo quando o texto estiver completo
        }

        return updatedInteractions;
      });
    }, 50); // Velocidade da digitação
  };

  return (
    <section className={styles.uploadInvoiceSection}>
      <div className={styles.headerContainer}>
        <h3>
          {selectedInvoice ? selectedInvoice.originalName : "Current Invoice"}
        </h3>
        {selectedInvoice && (
          <button className={styles.downloadButton} onClick={generatePDF}>
            Download
          </button>
        )}
      </div>

      <div className={styles.uploadInvoiceResult}>
        {selectedInvoice ? (
          <div className={styles.divSecundaria} ref={divSecundariaRef}>
            <div className={styles.imageDiv}>
              <img
                src={`https://invoice-case-backend.onrender.com/${selectedInvoice.filePath}`} // Exibe a imagem do documento selecionado
                alt={selectedInvoice.originalName}
                className={styles.previewImage}
              />
              <div className={`${styles.chatContainer} ${styles.iaMessage}`}>
                <p>{extractedText}</p>
              </div>
              {/* Exibe o texto extraído */}
            </div>
            {Array.isArray(interactions) &&
              interactions.map((interaction, index) => (
                <div
                  key={index}
                  className={`${styles.chatContainer} ${
                    interaction.type === "answer"
                      ? styles.iaMessage
                      : styles.userMessage
                  }`}
                >
                  <p>{interaction.displayedContent || interaction.content}</p>
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.uploadInvoiceBox}>
            <p>Select an invoice to view details</p>
          </div>
        )}
      </div>

      <div className={styles.uploadInvoiceInteraction}>
        <label>
          <textarea
            className={styles.uploadInvoiceTextarea}
            placeholder="Write a message..."
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                // Verifica se a tecla "Enter" foi pressionada sem "Shift"
                e.preventDefault(); 
                handleSendMessage(); 
              }
            }}
            disabled={!selectedInvoice || isLoading} 
          ></textarea>
        </label>
        <button
          className={styles.sendButton}
          onClick={handleSendMessage} 
          disabled={!selectedInvoice || !newMessage.trim() || isLoading} 
        >
          Send
        </button>
      </div>
    </section>
  );
}
