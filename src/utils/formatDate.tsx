const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const monthNum = date.getMonth();
  const month = months[monthNum as keyof typeof months];

  return { year, month };
};
