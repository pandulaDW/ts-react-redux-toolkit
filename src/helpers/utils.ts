export const convertToDTString = (d: Date) => {
  return d.toDateString() + " " + d.toLocaleTimeString();
};
