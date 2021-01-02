export const convertToDTString = (d: number): string => {
  return new Date(d).toDateString() + " " + new Date(d).toLocaleTimeString();
};

export const capitalize = (s: String): string => {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};

export const setIntersection = <T>(...sets: Set<T>[]): T[] => {
  let s1 = Array.from(sets[0]);

  sets.slice(1).forEach((set) => {
    s1 = s1.filter((el) => set.has(el));
  });

  return s1;
};

export const intersection = <T>(s1: T[], s2: T[]): T[] => {
  return setIntersection(new Set(s1), new Set(s2));
};

export const range = (end: number, start = 0, step = 1): number[] => {
  const seq: number[] = [];
  for (let index = start; index < end; index += step) {
    seq.push(index);
  }
  return seq;
};
