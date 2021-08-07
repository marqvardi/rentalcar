export const countDays = (values) => {
  const differenceInTime =
    values.dateReturn.getTime() - values.datePickUp.getTime();
  const days = differenceInTime / (1000 * 3600 * 24);

  return Math.trunc(days);
};
