export const rangeLimit = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(value, max));

export const formatDate = (date: number | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
};

// Path: src/utils/helper.ts
