export const convertToDTString = (d: number) => {
  return new Date(d).toDateString() + " " + new Date(d).toLocaleTimeString();
};

export const capitalize = (s: String) => {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};

const setIntersection = <T>(s1: Set<T>, s2: Set<T>): T[] => {
  return Array.from(s1).filter((el) => s2.has(el));
};

export const intersection = <T>(s1: T[], s2: T[]): T[] => {
  return setIntersection(new Set(s1), new Set(s2));
};
