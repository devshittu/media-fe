import { LoadingButtonTextList } from '@/components/loading/';
import { CategoryListItem } from './category-list-item';
import React, { useMemo } from 'react';
import { Category } from '../types';
import { useCategories } from '../api/get-categories';
import { CategoryListProps } from './types';
import { useCategoryContext } from '../hooks';

export const CategoryList = React.memo(
  ({ dataItems = [] }: CategoryListProps) => {
    const { data: responseData, isLoading } = useCategories({}); // Use data and isLoading directly from the hook
    // const { categories } = useCategoryContext();
    const stableCategories = useMemo(
      () => responseData?.results,
      [responseData?.results],
    );
    return (
      <>
        {isLoading && <LoadingButtonTextList wrapped />}
        {stableCategories?.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {stableCategories.map((category: Category) => (
              <CategoryListItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </>
    );
  },
);

CategoryList.displayName = 'CategoryList';
