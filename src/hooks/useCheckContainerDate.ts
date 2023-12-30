const useTwoDaysDifference = () => {
  const currentDate = new Date().toISOString();

  //isContainerExpired: Determines if the provided date is expired (two days after last update).
  const isContainerExpired = (date: string) => {
    const updateDate = new Date(date);
    const twoDaysFromNow = new Date(
      updateDate.setDate(updateDate.getDate() + 2)
    ).toISOString();
    return date >= twoDaysFromNow;
  };

  return { isContainerExpired };
};

export default useTwoDaysDifference;
