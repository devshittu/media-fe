import React from 'react';
import { SupportCategory } from '../../types';
import { Link } from '@/components/labs';
import { uriTemplate } from '@/utils';
import { FE_URI_GET_SUPPORT_ARTICLES_BY_CATEGORY_SLUG } from '@/config/frontend-uri-constants';
import { APP_SUPPORT_VERSION } from '@/config/constants';

interface SupportCategoryListProps {
  categories: SupportCategory[];
}

const SupportCategoryList: React.FC<SupportCategoryListProps> = ({
  categories,
}) => {
  return (
    <ul className="flex flex-wrap -m-2.5 gap-4 2xl:gap-8">
      {categories.map((item, index) => (
        <li
          key={index}
          className="flex items-start text-3xl text-blue-600-600 m-2.5"
        >
          <Link
            href={
              uriTemplate(`${FE_URI_GET_SUPPORT_ARTICLES_BY_CATEGORY_SLUG}`, {
                version: APP_SUPPORT_VERSION as string,
                category_slug: item.slug,
              }) || '#'
            }
            className="hover:underline underline-offset-2"
          >
            <span className="font-inter  font-medium text-slate-600 dark:text-slate-400">
              {item.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SupportCategoryList;
