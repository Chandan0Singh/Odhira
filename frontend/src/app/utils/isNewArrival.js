// utils/isNewArrival.js
export const isNewArrival = (arrivalDate, days = 15) => {
  const now = new Date();
  const arrival = new Date(arrivalDate);
  const diffInDays = (now - arrival) / (1000 * 60 * 60 * 24);
  return diffInDays <= days;
};
