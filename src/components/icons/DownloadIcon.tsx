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

export const DownloadIcon = ({
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
    stroke="blue"
    className="w-6 h-6 ">
    <motion.path
      variants={draw}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
    />
  </motion.svg>
);
