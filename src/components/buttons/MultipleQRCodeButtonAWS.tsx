import React, { useState } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button, CircularProgress } from "@nextui-org/react";
import { DownloadIcon } from "../icons/DownloadIcon";
import ReactDOM from "react-dom/client";
import QRCodeIcon from "../icons/QRCodeIcon";

type MultipleQrCodeButtonProps = {
  chassisNumbers: string[];
};

const MultipleQrCodeButton = ({
  chassisNumbers,
}: MultipleQrCodeButtonProps) => {
  const [progress, setProgress] = useState(0); // Track the progress

  const handleDownload = async () => {
    setProgress(0); // Initial progress

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4", // standard page size
    });

    for (let i = 0; i < chassisNumbers.length; i++) {
      const chassisNumber = chassisNumbers[i];

      // Create a hidden container for QR code rendering
      const container = document.createElement("div");
      container.style.width = "200px";
      container.style.height = "200px";
      container.style.position = "absolute";
      container.style.top = "-9999px"; // Hide it offscreen
      document.body.appendChild(container);

      // Render the QR code
      const root = ReactDOM.createRoot(container);
      root.render(
        <div id={`qrCodeContainer-${i}`}>
          <QRCode
            value={`https://master.d883d4yx0dfjd.amplifyapp.com/?search=${chassisNumber}`}
            size={200} // Adjust size as needed
          />
        </div>
      );

      await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure rendering is complete

      // Capture the QR code as an image
      const canvas = await html2canvas(container);
      const imgData = canvas.toDataURL("image/png");

      // Check if imgData is valid before adding to PDF
      if (imgData && imgData.startsWith("data:image/png;base64,")) {
        pdf.setFontSize(20);
        pdf.text("SCAN FOR DOCS", pdf.internal.pageSize.getWidth() / 2, 30, {
          align: "center",
        });

        const qrCodeYPosition = 40;

        pdf.addImage(
          imgData,
          "PNG",
          (pdf.internal.pageSize.getWidth() - 200) / 2,
          qrCodeYPosition,
          200,
          200
        );

        pdf.text(
          chassisNumber,
          pdf.internal.pageSize.getWidth() / 2,
          qrCodeYPosition + 200 + 20, // Place the chassis number right below the QR code
          {
            align: "center",
          }
        );

        if (i < chassisNumbers.length - 1) {
          pdf.addPage();
        }

        // Update progress based on the number of chassis numbers processed
        setProgress(Math.round(((i + 1) / chassisNumbers.length) * 100));
      } else {
        console.error("Invalid image data:", imgData);
      }

      // Clean up the container element and unmount the React root
      root.unmount();
      document.body.removeChild(container);
    }

    pdf.save(`chassis_qrcodes.pdf`);

    // Reset the progress after a short delay
    setTimeout(() => setProgress(0), 1000);
  };

  return (
    <Button
      color="secondary"
      size="lg"
      onClick={handleDownload}
      disabled={progress > 0 && progress < 100} // Disable button while loading
    >
      {progress > 0 && progress < 100 ? (
        <CircularProgress value={progress} size="sm" color="primary" />
      ) : (
        <QRCodeIcon />
      )}
      {progress > 0 && progress < 100 && ` ${progress}%`}
    </Button>
  );
};

export default MultipleQrCodeButton;
