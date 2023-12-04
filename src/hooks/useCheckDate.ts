//useCheckDate Hook:

//This custom hook provides functions for checking whether a date is expired or
//soon-to-expire based on the current date.

export const useCheckDate = () => {
  const currentDate = new Date().toISOString();
  let sevenDaysAhead = new Date();
  const sevenDaysFromNow = new Date(
    sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7)
  ).toISOString();
  //isExpired: Determines if the provided date is expired (before the current date).
  const isExpired = (date: string) => {
    return date < currentDate;
  };
  //isExpireSoon: Determines if the provided date is within the next 7 days from the current date.
  const isExpireSoon = (date: string) => {
    return date < sevenDaysFromNow && date > currentDate;
  };

  return { isExpired, isExpireSoon };
};
