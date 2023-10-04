import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category } from '../types';
import { useCategories } from '../api/get-categories';

type CategoriesContextProps = {
  categoryLookupTable: Record<string, { title: string; slug: string }>;
  categories: Category[];
  isLoading: boolean; // Add isLoading property
};

export const CategoriesContext = createContext<CategoriesContextProps>({
  categoryLookupTable: {},
  categories: [],
  isLoading: false, // Initialize isLoading as false
});

export type CategoriesProviderProps = {
  children?: React.ReactNode;
};

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categoryLookupTable, setCategoryLookupTable] = useState<
    Record<string, { title: string; slug: string }>
  >({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({
    params: { page_size: 100 },
  });

  useEffect(() => {
    if (categoriesData) {
      const lookupTable: Record<string, { title: string; slug: string }> = {};
      for (const category of categoriesData?.results) {
        lookupTable[category.id] = {
          title: category.title,
          slug: category.slug,
        };
      }
      setCategoryLookupTable(lookupTable);
      setCategories(categoriesData?.results);
    }
    setIsLoading(categoriesLoading);
  }, [categoriesData, categoriesLoading]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        categoryLookupTable,
        isLoading,
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
