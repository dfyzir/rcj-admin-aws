import { useMemo, useState } from "react";
import { ChassisLocation } from "@/API";
import { updateChassisLocation } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { motion } from "framer-motion";
import { CheckedCircleIcon } from "../icons/CheckedCIrcleIcon";

const DragGesture = ({
  index,
  item,
}: {
  index: string;
  item: ChassisLocation;
}) => {
  const [divWidth, setDivWidth] = useState(30);
  const [draggedDistance, setDraggedDistance] = useState(0);

  const handleDragEvent = async () => {
    if (divWidth >= 160) {
      const client = generateClient();
      await client.graphql({
        query: updateChassisLocation,
        variables: {
          input: {
            id: item.id,
          },
        },
      });
    }
    setDivWidth(30);
  };

  const draggableVariants = useMemo(() => {
    return {
      initial: {
        width: `${divWidth}px`,
        height: "105px",
        opacity: 0.5,
        padding: 0,
        top: 0,
        zIndex: 20,
      },
      whileDrag: {
        opacity: 1,
        background:
          "linear-gradient(to right, rgba(165, 243, 252, 0.5), rgba(96, 165, 250,0.8))",
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
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
      initial="initial"
      animate="animate"
      whileDrag="whileDrag"
      onDrag={(event: MouseEvent) => {
        if (event.x <= 165) {
          setDivWidth(Math.max(event.x, 30));
        }
      }}
      onDragEnd={(event, info) => {
        if (info.point.x > 160) {
          handleDragEvent();
        }
      }}
      onTouchEnd={() => setDivWidth(30)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragMomentum={false}
      dragElastic={0.0}
      className="items-center">
      <div className=" w-[20px] h-full flex items-center absolute ml-2">
        <CheckedCircleIcon
          fill={`${
            divWidth < 60
              ? "transparent"
              : divWidth < 100
              ? "rgba(60, 179, 113, 0.2)"
              : divWidth < 130
              ? "rgba(60, 179, 113, 0.6)"
              : "rgba(60, 179, 113, 1)"
          }`}
          className="transition duration-1000"
        />
      </div>
    </motion.div>
  );
};

export default DragGesture;
