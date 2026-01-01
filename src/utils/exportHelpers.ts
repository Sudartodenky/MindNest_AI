import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import logoWhite from "../assets/logo/white.png"; 

const MOOD_LABELS: Record<number, string> = {
  1: "Marah/Kesal",
  2: "Sedih/Down",
  3: "Biasa Saja",
  4: "Baik/Cukup",
  5: "Sangat Senang",
};

const formatDuration = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s}s`;
};

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  });
};

export const generateExport = async (format: string, rawUserData: any, displayName: string) => {
  const fileName = `MindNest_Report_${displayName.replace(/\s+/g, "_")}`;
  const moodHistory = rawUserData.moodHistory || [];
  const detoxHistory = rawUserData.detoxHistory || [];
  const totalDetoxSeconds = rawUserData.totalDetoxSeconds || 0;

  if (format === "pdf") {
    const docPDF = new jsPDF();
    const logo = await loadImage(logoWhite);
    
    docPDF.setFillColor(79, 70, 229);
    docPDF.rect(0, 0, 210, 40, "F");
    
    const logoX = 15;
    const logoY = 11;
    const logoSize = 18; 
    const textX = logoX + logoSize + 5; 
    
    docPDF.addImage(logo, "PNG", logoX, logoY, logoSize, logoSize);
    
    docPDF.setFont("helvetica", "bold");
    docPDF.setFontSize(22);
    docPDF.setTextColor(255, 255, 255);
    docPDF.text("MindNest AI", textX, logoY + 8); 
    
    docPDF.setFont("helvetica", "normal");
    docPDF.setFontSize(10);
    docPDF.text("Laporan Kesehatan Mental & Digital Detox", textX, logoY + 15); 
    
    docPDF.setFillColor(243, 244, 246);
    docPDF.roundedRect(15, 48, 180, 25, 3, 3, "F");
    
    docPDF.setTextColor(55, 65, 81);
    docPDF.setFontSize(9);
    docPDF.setFont("helvetica", "bold");
    docPDF.text("RINGKASAN PROFIL", 20, 55);
    
    docPDF.setFont("helvetica", "normal");
    docPDF.text(`Nama: ${displayName}`, 20, 62);
    docPDF.text(`Total Jurnal: ${moodHistory.length}`, 80, 62);
    docPDF.text(`Waktu Detox: ${formatDuration(totalDetoxSeconds)}`, 140, 62);

    docPDF.setFontSize(13);
    docPDF.setTextColor(79, 70, 229);
    docPDF.setFont("helvetica", "bold");
    docPDF.text("Riwayat Mood & Jurnal", 15, 85);

    const moodTableData = moodHistory.map((m: any) => [
      m.date || "-",
      `${m.mood} - ${MOOD_LABELS[m.mood] || m.mood}`,
      m.note || "Tidak ada catatan."
    ]);

    autoTable(docPDF, {
      head: [["Tanggal", "Kondisi Mood", "Catatan Harian"]],
      body: moodTableData,
      startY: 90,
      margin: { left: 15, right: 15 },
      theme: "grid",
      headStyles: { 
        fillColor: [79, 70, 229], 
        fontSize: 10, 
        halign: "center",
        fontStyle: "bold" 
      },
      styles: { fontSize: 9, cellPadding: 4, valign: "middle" },
      columnStyles: {
        0: { cellWidth: 35, halign: "center" },
        1: { cellWidth: 45 },
        2: { cellWidth: "auto" }
      },
      alternateRowStyles: { fillColor: [250, 251, 255] }
    });

    const finalY = (docPDF as any).lastAutoTable.finalY + 15;
    
    if (finalY > 250) docPDF.addPage();

    docPDF.setFontSize(13);
    docPDF.setTextColor(16, 185, 129);
    docPDF.setFont("helvetica", "bold");
    docPDF.text("Aktivitas Digital Detox", 15, finalY);

    const detoxTableData = detoxHistory.map((d: any) => [
      d.date ? new Date(d.date).toLocaleString("id-ID") : "-",
      formatDuration(d.duration || 0)
    ]);

    autoTable(docPDF, {
      head: [["Waktu Sesi", "Durasi Ketenangan"]],
      body: detoxTableData,
      startY: finalY + 5,
      margin: { left: 15, right: 15 },
      theme: "striped",
      headStyles: { fillColor: [16, 185, 129], fontSize: 10, halign: "center" },
      styles: { fontSize: 9, cellPadding: 4, halign: "center" },
      alternateRowStyles: { fillColor: [240, 253, 244] }
    });

    const pageCount = docPDF.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      docPDF.setPage(i);
      docPDF.setFontSize(8);
      docPDF.setTextColor(156, 163, 175);
      docPDF.text(
        `Dicetak pada: ${new Date().toLocaleString("id-ID")} | Halaman ${i} dari ${pageCount}`,
        105,
        290,
        { align: "center" }
      );
    }

    docPDF.save(`${fileName}.pdf`);

  } else if (format === "excel") {
    const journalWS = XLSX.utils.json_to_sheet(moodHistory.map((m: any) => ({
      "Tanggal": m.date || "-",
      "Mood": MOOD_LABELS[m.mood] || m.mood,
      "Catatan": m.note || "-"
    })));

    const detoxWS = XLSX.utils.json_to_sheet(detoxHistory.map((d: any) => ({
      "Waktu Sesi": d.date ? new Date(d.date).toLocaleString("id-ID") : "-",
      "Durasi (Detik)": d.duration || 0,
      "Durasi (Format)": formatDuration(d.duration || 0)
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, journalWS, "Riwayat Jurnal");
    XLSX.utils.book_append_sheet(workbook, detoxWS, "Riwayat Detox");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);

  } else if (format === "json") {
    const dataStr = JSON.stringify(rawUserData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
  }
};