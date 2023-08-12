import { useState } from 'react';

type SortOrder = 'asc' | 'desc';
type SortType = 'string' | 'number' | 'date';

export const useListSorting = <T extends { [key: string]: any }>(
  data: T[],
  sortByField: string,
  initialSortOrder: SortOrder = 'asc',
) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  // Check if data is valid
  if (!Array.isArray(data) || data.length === 0 || !data[0][sortByField]) {
    return { sortedData: [], sortOrder, toggleSortOrder: () => {} };
  }
  console.log('data', data);
  // return;
  // Determine the type of the data
  const determineType = (item: any): SortType => {
  if (typeof item === 'string') {
    // Check if the string can be converted to a valid date
    const date = new Date(item);
    if (!isNaN(date.getTime())) {
      return 'date';
    }
    return 'string';
  } else if (typeof item === 'number') {
    return 'number';
  }
  return 'string'; // default to string if type is not recognized
};


  const dataType = determineType(data[0][sortByField]);

  const sortedData = [...data].sort((a, b) => {
    switch (dataType) {
      case 'string':
        return sortOrder === 'asc'
          ? a[sortByField].localeCompare(b[sortByField])
          : b[sortByField].localeCompare(a[sortByField]);
      case 'number':
        return sortOrder === 'asc'
          ? a[sortByField] - b[sortByField]
          : b[sortByField] - a[sortByField];
      case 'date':
        const dateA = new Date(a[sortByField]).getTime();
        const dateB = new Date(b[sortByField]).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      default:
        return 0;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return { sortedData, sortOrder, toggleSortOrder };
};