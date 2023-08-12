import { useState, useEffect } from 'react';

export const useListGrouping = <T extends { [key: string]: any }>(
  data: T[],
  groupByField: string,
  formatFunction: (value: any) => string,
) => {
  const [groupedItems, setGroupedItems] = useState<{ [key: string]: T[] }>({});

  useEffect(() => {
    if (!data) return;
    const grouped = data.reduce((acc: { [key: string]: T[] }, item: T) => {
      const value = formatFunction(item[groupByField]);

      if (!acc[value]) {
        acc[value] = [];
      }

      acc[value].push(item);

      return acc;
    }, {});

    if (JSON.stringify(grouped) !== JSON.stringify(groupedItems)) {
      setGroupedItems(grouped);
    }
  }, [data, groupByField, formatFunction]); // eslint-disable-line react-hooks/exhaustive-deps

  return groupedItems;
};

//Path: hooks/useListGrouping.ts
