'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { useCategories } from '../api/get-categories';
import { Category } from '../types';

type CategoriesContextProps = {
  categories: Category[];
  categoriesLookupTable: Record<
    string,
    { title: string; slug: string; description: string }
  >;
  isLoading: boolean;
};

export const CategoriesContext = createContext<CategoriesContextProps>({
  categories: [],
  categoriesLookupTable: {},
  isLoading: false,
});

export type CategoriesProviderProps = {
  children?: React.ReactNode;
};

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const { data: responseData, isLoading } = useCategories({
    params: { page_size: 100 },
  });

  const categories = useMemo(() => {
    return (
      responseData?.results.map((category) => ({
        ...category,
        id: category.id.toString(), // Convert ID to string
      })) || []
    );
  }, [responseData?.results]);

  const categoriesLookupTable: Record<
    string,
    { title: string; slug: string; description: string }
  > = {};
  categories.forEach((category) => {
    categoriesLookupTable[category.id] = {
      title: category.title,
      slug: category.slug,
      description: category.description,
    };
  });

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        categoriesLookupTable,
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
// Ensure default export for context
export default CategoriesContext;
//Path: src/features/categories/hooks/categories-context.tsx
