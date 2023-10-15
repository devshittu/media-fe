import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({
    params: { page_size: 100 },
  });

  const categoriesLookupTable = useMemo(() => {
    const lookupTable: Record<
      string,
      { title: string; slug: string; description: string }
    > = {};
    for (const category of categoriesData?.results || []) {
      lookupTable[category.id] = {
        title: category.title,
        slug: category.slug,
        description: category.description,
      };
    }
    return lookupTable;
  }, [categoriesData]);

  useEffect(() => {
    setCategories(categoriesData?.results);
    setIsLoading(categoriesLoading);
  }, [categoriesLoading, categoriesData]);

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

//Path: src/features/categories/hooks/categories-context.tsx
