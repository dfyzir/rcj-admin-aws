import React, { useState } from "react";
import QRCode from "qrcode.react";
import domtoimage from "dom-to-image";
import { Button } from "@nextui-org/react";
import QRCodeIcon from "../icons/QRCodeIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import CloseIcon from "../icons/CloseIcon";

const QrCodeButton = ({ text }: { text: string }) => {
  const [showQrCode, setShowQrCode] = useState(false);

  const handleGenerateQrCode = () => {
    setShowQrCode(true);
  };

  const handleDownload = () => {
    const qrCodeContainer = document.getElementById("qrCodeContainer");

    domtoimage.toBlob(qrCodeContainer!).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png";
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
            <QRCode bgColor="white" value={text} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QrCodeButton;
