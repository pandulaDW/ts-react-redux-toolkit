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

export const sortArrayIndex = <T extends string | number>(
  arr: T[],
  desc: boolean
): number[] => {
  const sorted = arr
    .map((el, idx) => ({ [el]: idx }))
    .sort((a, b) => {
      if (Object.keys(a)[0] < Object.keys(b)[0]) {
        if (desc) return 1;
        return -1;
      }
      if (Object.keys(a)[0] > Object.keys(b)[0]) {
        if (desc) return -1;
        return 1;
      }
      return 0;
    });

  return sorted.map((el) => Object.values(el)[0]);
};

export function promisifiedTimeout(interval: number) {
  return new Promise((resolve) => setTimeout(resolve, interval));
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve((reader.result as string).split(";base64,")[1]);
    reader.onerror = (err) => reject(err);
  });
}
