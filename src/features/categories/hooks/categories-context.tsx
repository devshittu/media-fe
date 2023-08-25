import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category } from '../types';
import { useCategories } from '../api/get-categories';

type CategoriesContextProps = {
  categoryTitlesLookUpTable: Record<string, string>;
  categories: Category[];
};

export const CategoriesContext = createContext<CategoriesContextProps>({
  categoryTitlesLookUpTable: {},
  categories: [],
});

export type CategoriesProviderProps = {
  children?: React.ReactNode;
};

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categoryTitlesLookUpTable, setCategoryTitlesLookUpTable] = useState<
    Record<string, string>
  >({});
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: categoriesData } = useCategories({});

  useEffect(() => {
    if (categoriesData) {
      const categoriesMap: Record<string, string> = {};
      for (const category of categoriesData?.categories) {
        categoriesMap[category.id] = category.title;
      }
      setCategoryTitlesLookUpTable(categoriesMap);
      setCategories(categoriesData?.categories);
    }
  }, [categoriesData]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        categoryTitlesLookUpTable,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
export const useCategoryContext = () => {
  return useContext(CategoriesContext);
};

//Path: src/features/categories/hooks/categories-context.tsx
