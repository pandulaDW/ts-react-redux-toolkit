export const convertToDTString = (d: Date) => {
  return d.toDateString() + " " + d.toLocaleTimeString();
};

export const capitalize = (s: String) => {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};
