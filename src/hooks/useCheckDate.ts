//useCheckDate Hook:

//This custom hook provides functions for checking whether a date is expired or
//soon-to-expire based on the current date.

export const useCheckDate = () => {
  const currentDate = new Date().toISOString();
  let thirtyDaysAhead = new Date();
  const thirtyDaysFromNow = new Date(
    thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 30)
  ).toISOString();
  //isExpired: Determines if the provided date is expired (before the current date).
  const isExpired = (date: string) => {
    return date < currentDate;
  };
  //isExpireSoon: Determines if the provided date is within the next 30 days from the current date.
  const isExpireSoon = (date: string) => {
    return date < thirtyDaysFromNow && date > currentDate;
  };

  return { isExpired, isExpireSoon };
};
