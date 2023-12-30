import { ChassisLocation } from "@/API";

const useCheckedInventory = () => {
  const currentDate = new Date();

  const isCheckedIn = (date: string) => {
    const currentTime = new Date(currentDate).getTime();
    const inventoryDate = new Date(date);
    const inventoryEndOfCheckIn = new Date(
      inventoryDate.setHours(inventoryDate.getHours() + 2)
    ).getTime();

    return inventoryEndOfCheckIn > currentTime;
  };

  return { isCheckedIn };
};

export default useCheckedInventory;
// const useTwoDaysDifference = () => {
//   const currentDate = new Date().toISOString();

//   //isContainerExpired: Determines if the provided date is expired (two days after last update).
//   const isContainerExpired = (date: string) => {
//     const updateDate = new Date(date);
//     const twoDaysFromNow = new Date(
//       updateDate.setDate(updateDate.getDate() + 2)
//     ).toISOString();
//     return date >= twoDaysFromNow;
//   };

//   return { isContainerExpired };
// };

// export default useTwoDaysDifference;
