// ArticleItem.tsx
import React from 'react';
import { SupportArticle } from '../../types';
import { Link } from '@/components/labs';
import { formatDate, uriTemplate } from '@/utils';
import { FE_URI_GET_SUPPORT_ARTICLE_BY_SLUG } from '@/config/frontend-uri-constants';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import { ArrowRightIcon, Icon } from '@/components/illustrations';

export interface SupportArticleProps {
  article: SupportArticle;
}
export const SupportArticleItem: React.FC<SupportArticleProps> = ({
  article,
}) => {
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-slate-700 dark:text-slate-200">
          {article.category.name}
        </span>
        <span className="mt-1 text-slate-800 dark:text-slate-300 text-sm">
          {formatDate(article.updated_at)}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          {article.title}
        </h2>
        <p className="leading-relaxed text-slate-800 dark:text-slate-300">
          {article.summary}
        </p>
        <Link
          href={
            uriTemplate(`${FE_URI_GET_SUPPORT_ARTICLE_BY_SLUG}`, {
              version: APP_SUPPORT_VERSION as string,
              slug: article.slug,
            }) || '#'
          }
          className="text-cyan-500 inline-flex items-center mt-4"
        >
          Learn More
          <Icon icon={<ArrowRightIcon />} className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};
