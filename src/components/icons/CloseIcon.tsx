import React from "react";
import { IconSvgProps } from "../../lib/types";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay, duration: 2 },
      },
    };
  },
};

export const CloseIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <motion.svg
    initial="hidden"
    animate="visible"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6">
    <motion.path
      variants={draw}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </motion.svg>
);

export default CloseIcon;
