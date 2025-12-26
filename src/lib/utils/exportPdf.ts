'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPdfOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export async function exportElementToPdf(
  element: HTMLElement,
  options: ExportPdfOptions = {}
): Promise<void> {
  const {
    filename = 'yoga-flow.pdf',
    quality = 0.95,
    scale = 2,
  } = options;

  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', quality);

    // Calculate dimensions for A4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions to fit the page
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center the image on the page
    const x = (pdfWidth - scaledWidth) / 2;
    const y = 10; // 10mm top margin

    // Check if content fits on one page
    const contentHeight = scaledHeight + 20; // Add margins

    if (contentHeight <= pdfHeight) {
      // Single page
      pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
    } else {
      // Multi-page: split the image across pages
      const pageContentHeight = pdfHeight - 20; // Account for margins
      const totalPages = Math.ceil(scaledHeight / pageContentHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Calculate the portion of the image to show on this page
        const sourceY = (page * pageContentHeight / ratio);
        const sourceHeight = Math.min(pageContentHeight / ratio, imgHeight - sourceY);

        // Create a temporary canvas for this page's portion
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, sourceY, imgWidth, sourceHeight,
            0, 0, imgWidth, sourceHeight
          );

          const pageImgData = pageCanvas.toDataURL('image/jpeg', quality);
          const pageHeight = sourceHeight * ratio;

          pdf.addImage(pageImgData, 'JPEG', x, y, scaledWidth, pageHeight);
        }
      }
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

// Helper to sanitize filename
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .substring(0, 50) || 'yoga-flow';
}
