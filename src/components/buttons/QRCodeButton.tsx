import React, { useState } from "react";
import QRCode from "qrcode.react";
import domtoimage from "dom-to-image";
import { Button } from "@nextui-org/react";
import QRCodeIcon from "../icons/QRCodeIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import CloseIcon from "../icons/CloseIcon";

/*QrCodeButton Component:
 
 This component represents a button that generates a QR code based on the provided text.
 Users can click the button to display the generated QR code, and additional options
 to close or download the QR code image. The generated QR code is a link to a search
 page with the specified text.*/

type QRCodeButtonProps = {
  text: string;
};

const QrCodeButton = ({ text }: QRCodeButtonProps) => {
  // State to track whether the QR code should be displayed
  const [showQrCode, setShowQrCode] = useState(false);

  const handleGenerateQrCode = () => {
    setShowQrCode(true);
  };

  // Function to handle downloading the generated QR code image
  const handleDownload = () => {
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    // Convert the container to a Blob and create a download link
    domtoimage.toBlob(qrCodeContainer!).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${text}_qrcode.png`;
      link.click();
    });
  };

  return (
    <div>
      <Button
        color="secondary"
        variant="light"
        className={`${showQrCode ? "hidden" : null}`}
        title="Generate QR Code"
        isIconOnly
        onPress={handleGenerateQrCode}>
        <QRCodeIcon />
      </Button>
      {showQrCode && (
        <div>
          <div className="flex justify-between">
            <Button
              color="danger"
              variant="light"
              title="Close"
              isIconOnly
              onPress={() => setShowQrCode(false)}>
              <CloseIcon />
            </Button>
            <Button
              color="secondary"
              variant="light"
              title="Download"
              isIconOnly
              onPress={handleDownload}>
              <DownloadIcon />
            </Button>
          </div>
          <div id="qrCodeContainer">
            <QRCode
              value={`https://master.d2wh8h5fxb8ur2.amplifyapp.com/?search=${text}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QrCodeButton;
