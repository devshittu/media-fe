'use client';
// ArticleList.tsx
import React, { useMemo } from 'react';
import { SupportArticleItem } from './support-article-item';
import { SupportArticle } from '../../types';
import { useGetSupportArticles } from '../../api/get-support-articles';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import { LoadingButtonTextList } from '@/components/loading';

interface SupportArticleListProps {
  articles: SupportArticle[];
}

export const SupportArticleList: React.FC<SupportArticleListProps> = ({
  articles,
}) => {
  const { data: responseData, isLoading } = useGetSupportArticles({
    params: {
      page_size: 15,
      // document: 'article',
      version: `${APP_SUPPORT_VERSION}`,
    },
  }); // Use data and isLoading directly from the hook

  const stableSupportArticles = useMemo(
    () => responseData?.results,
    [responseData?.results],
  );
  return (
    <section className="text-slate-600 body-font overflow-hidden">
      <div className="container">
        <div className="-my-8 divide-y-2 divide-slate-100 dark:divide-slate-600">
          {articles && articles?.length > 0 ? (
            articles.map((article: SupportArticle, index: number) => (
              <SupportArticleItem key={article.id} article={article} />
            ))
          ) : (
            <>
              {isLoading && <LoadingButtonTextList wrapped />}
              {stableSupportArticles?.length > 0 &&
                stableSupportArticles.map(
                  (article: SupportArticle, index: number) => (
                    <SupportArticleItem key={article.id} article={article} />
                  ),
                )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
