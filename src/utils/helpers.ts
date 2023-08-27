import { ObjectItem } from '@/types';

export const rangeLimit = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(value, max));
export const removeHashFromHashtag = (word: string): string => {
  // Regular expression to match '#' at the beginning of a word
  const regex = /^#(.+)/;
  // Use the replace method with the regex to remove the '#' at the beginning and extract the rest of the word
  return word.replace(regex, '$1');
};

export const getObjectsByIds = <T extends ObjectItem>(
  items: T[],
  ids: string[],
): T[] => {
  const result: T[] = [];

  ids.forEach((id) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      result.push(item);
    }
  });

  return result;
};

export const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[-]+/g, '-')
    .replace(/[^\w-]+/g, '');

// export const slug = (str: string): string => {
//   str = str.trim().toLowerCase();

//   const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
//   const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";

//   for (let i = 0, l = from.length; i < l; i++) {
//     str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
//   }

//   str = str.replace(/[^a-z0-9 -]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-');

//   return str;
// };

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Recursively updates properties within an object, including nested objects and arrays.
 *
 * @param {T | undefined} obj - The object to update.
 * @param {DeepPartial<T>} update - An object representing the properties to update.
 *
 * @returns {T} - The updated object.
 *
 * @throws Will throw an error if the provided object is undefined.
 *
 * @example
 *
 * const obj = { a: { b: 1 }, c: [1, 2] };
 * const updatedObj = updateDeep(obj, { a: { b: 2 }, c: [3, 4] });
 * // updatedObj will be { a: { b: 2 }, c: [3, 4] }
 */
export const updateDeep = <T>(
  obj: T | undefined,
  update: DeepPartial<T>,
): T => {
  if (!obj) {
    throw new Error('The provided object is undefined.');
  }
  for (const key in update) {
    if (typeof update[key] === 'object' && !Array.isArray(update[key])) {
      if (typeof obj[key] !== 'object' || Array.isArray(obj[key])) {
        obj[key] = {} as any; // Create an empty object if the original value is not an object or an array
      }
      obj[key] = updateDeep(obj[key], update[key] as any);
    } else if (Array.isArray(update[key])) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [] as any; // Create an empty array if the original value is not an array
      }
      // Use a type assertion here to let TypeScript know that update[key] is an array
      const updateArray = update[key] as any[];
      if (typeof updateArray[0] === 'object') {
        // Use an index signature to access the elements within the array
        const updatedArray = updateArray.map((item, index) =>
          typeof item === 'object' &&
          (obj[key] as any[])[index] &&
          typeof (obj[key] as any[])[index] === 'object'
            ? updateDeep((obj[key] as any[])[index], item as any)
            : item,
        );
        obj[key] = updatedArray as any;
      } else {
        // If the element in the update array is not an object, replace the entire array
        obj[key] = updateArray as any;
      }
    } else {
      obj[key] = update[key] as any;
    }
  }
  return obj;
};

export const pluralize = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

// Helper function to create a delay with cancellation
export const delayWithCancel = (ms: number) => {
  let timeoutId: NodeJS.Timeout;
  const promise = new Promise((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });
  const cancel = () => clearTimeout(timeoutId);
  return { promise, cancel };
};

// Path: src/utils/helper.ts
