import React, { useState } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button, Spinner } from "@nextui-org/react";
import QRCodeIcon from "../icons/QRCodeIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import ReactDOM from "react-dom/client";

type QRCodeButtonProps = {
  chassisNumber: string;
};

const QrCodeButton = ({ chassisNumber }: QRCodeButtonProps) => {
  const [loading, setLoading] = useState(false); // State to track loading

  const handleDownload = async () => {
    setLoading(true); // Start loading

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4", // standard page size
    });

    const qrCodeContainerId = "qrCodeContainerSingle";
    let qrCodeContainer = document.getElementById(qrCodeContainerId);

    if (!qrCodeContainer) {
      qrCodeContainer = document.createElement("div");
      qrCodeContainer.id = qrCodeContainerId;
      qrCodeContainer.style.width = "200px";
      qrCodeContainer.style.height = "200px";
      qrCodeContainer.style.position = "absolute";
      qrCodeContainer.style.top = "-9999px"; // Hide it offscreen
      document.body.appendChild(qrCodeContainer);
    }

    // Clean up any existing React root and recreate it
    const root = ReactDOM.createRoot(qrCodeContainer);
    root.render(
      <QRCode
        value={`https://master.d883d4yx0dfjd.amplifyapp.com/?search=${chassisNumber}`}
        size={200}
      />
    );

    // Wait for rendering to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Capture the QR code as an image
    const canvas = await html2canvas(qrCodeContainer);
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

      pdf.save(`${chassisNumber}_qrcode.pdf`);
    } else {
      console.error("Invalid image data:", imgData);
    }

    // Clean up the container element and unmount the React root
    root.unmount();
    document.body.removeChild(qrCodeContainer);

    setLoading(false); // End loading
  };

  return (
    <div>
      <Button
        color="secondary"
        variant="light"
        title="Download QR Code as PDF"
        isIconOnly
        onPress={handleDownload}
        disabled={loading} // Disable button while loading
      >
        {loading ? <Spinner size="sm" /> : <QRCodeIcon />}
      </Button>
    </div>
  );
};

export default QrCodeButton;
