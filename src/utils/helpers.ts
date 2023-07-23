export const rangeLimit = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(value, max));
export const removeHashFromHashtag = (word: string): string => {
  // Regular expression to match '#' at the beginning of a word
  const regex = /^#(.+)/;
  // Use the replace method with the regex to remove the '#' at the beginning and extract the rest of the word
  return word.replace(regex, '$1');
};

export const formatDate = (date: number | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
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

// Path: src/utils/helper.ts
