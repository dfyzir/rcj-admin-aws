import React from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "@nextui-org/react";

type ShareButtonProps = {
  text: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: "Share via",
          text: text,
        });
      } else {
        // Fallback for browsers that do not support Web Share API
        // You can implement your custom sharing logic here
        alert("Web Share API is not supported on this browser");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Button
      size="lg"
      color="primary"
      variant="light"
      isIconOnly
      onPress={handleShare}
      title="Share">
      <ShareIcon />
    </Button>
  );
};

export default ShareButton;
