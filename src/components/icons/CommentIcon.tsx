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
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 1 },
      },
    };
  },
};

export const CommentIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <motion.svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size ?? height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size ?? width}
    initial="hidden"
    animate="visible">
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}>
      <motion.path
        custom={0}
        variants={draw}
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      />
    </g>
  </motion.svg>
);
