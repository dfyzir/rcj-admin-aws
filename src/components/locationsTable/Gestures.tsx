import { useEffect, useMemo, useState } from "react";
import { ChassisLocation } from "@/API";
import { updateChassisLocation } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { motion } from "framer-motion";

const DragGesture = ({
  index,
  item,
  onReadyChange,
  onCommit,
}: {
  index: string;
  item: ChassisLocation;
  onReadyChange?: (ready: boolean) => void;
  onCommit?: () => void;
}) => {
  const minWidth = 34;
  const successOffset = 110;
  const maxWidth = 168;

  const [divWidth, setDivWidth] = useState(minWidth);
  const [isReady, setIsReady] = useState(false);

  const setGestureReady = (ready: boolean) => {
    setIsReady(ready);
  };

  useEffect(() => {
    onReadyChange?.(isReady);
  }, [isReady, onReadyChange]);

  const handleDragEvent = async () => {
    if (divWidth >= minWidth + successOffset) {
      const client = generateClient();
      await client.graphql({
        query: updateChassisLocation,
        variables: {
          input: {
            id: item.id,
          },
        },
      });
      onCommit?.();
    }
    setGestureReady(false);
    setDivWidth(minWidth);
  };

  const draggableVariants = useMemo(() => {
    return {
      initial: {
        width: `${divWidth}px`,
        height: "100%",
        opacity: 0.7,
        padding: 0,
        top: 0,
        left: 0,
        zIndex: 30,
      },
      whileDrag: {
        opacity: 1,
        background:
          "linear-gradient(to right, rgba(165, 243, 252, 0.45), rgba(96, 165, 250, 0.75))",
      },

      animate: {
        width: `${divWidth}px`,
      },
    };
  }, [divWidth]);

  // ... (Event handlers and logic as explained in previous responses)

  return (
    <motion.div
      key={index}
      variants={draggableVariants}
      style={{
        position: "absolute",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        touchAction: "pan-y",
      }}
      initial="initial"
      animate="animate"
      whileDrag="whileDrag"
      onDrag={(event, info) => {
        const nextWidth = Math.min(
          maxWidth,
          Math.max(minWidth, minWidth + info.offset.x),
        );

        setDivWidth(nextWidth);
        setGestureReady(info.offset.x >= successOffset);
      }}
      onDragEnd={(event, info) => {
        if (info.offset.x >= successOffset) {
          handleDragEvent();
          return;
        }
        setGestureReady(false);
        setDivWidth(minWidth);
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragMomentum={false}
      dragElastic={0.0}
      className="inset-y-0 left-0 touch-pan-y bg-[linear-gradient(90deg,rgba(49,107,173,0.12)_0%,rgba(0,141,193,0.08)_60%,rgba(49,107,173,0.02)_100%)] shadow-[inset_-1px_0_0_rgba(49,107,173,0.10)] dark:bg-[linear-gradient(90deg,rgba(148,163,184,0.14)_0%,rgba(148,163,184,0.05)_60%,rgba(148,163,184,0.02)_100%)] dark:shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]">
      <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-slate-400/80 dark:text-white/25">
        <span
          className={`text-xs font-semibold tracking-[0.2em] transition-colors duration-150 ${
            isReady ? "text-emerald-500 dark:text-emerald-400" : ""
          }`}>
          {">>"}
        </span>
      </div>
    </motion.div>
  );
};

export default DragGesture;
