'use client';
import { LoadingButtonTextList } from '@/components/loading';
import { SupportArticle, useGetSupportArticles } from '../../';
import React, { useMemo } from 'react';
import { Link } from '@/components/labs/typography';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import { uriTemplate, word_pluralize } from '@/utils';
import { FE_URI_GET_SUPPORT_ARTICLE_BY_SLUG } from '@/config/frontend-uri-constants';

type ExtraArticlesProps = {
  heading: string;
};

export const ExtraArticles = ({ heading }: ExtraArticlesProps) => {
  const { data: responseData, isLoading } = useGetSupportArticles({
    params: {
      page_size: 4,
      // document: 'article',
      version: `${APP_SUPPORT_VERSION}`,
    },
  }); // Use data and isLoading directly from the hook

  const stableSupportArticles = useMemo(
    () => responseData?.results,
    [responseData?.results],
  );

  return (
    <aside
      aria-label="Related articles"
      className="py-8 lg:py-24 bg-slate-50 dark:bg-slate-800"
    >
      <div className="px-4 mx-auto max-w-screen-xl">
        <h2 className="mb-8 text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight ">
          {heading}
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading && <LoadingButtonTextList wrapped />}
          {stableSupportArticles?.length > 0 &&
            stableSupportArticles.map(
              (article: SupportArticle, index: number) => (
                <article key={index} className="max-w-xs">
                  <h2 className="mb-2 text-xl font-bold leading-tight text-slate-900 dark:text-white">
                    <Link
                      href={
                        uriTemplate(`${FE_URI_GET_SUPPORT_ARTICLE_BY_SLUG}`, {
                          version: APP_SUPPORT_VERSION as string,
                          slug: article.slug,
                        }) || '#'
                      }
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mb-4 font-light text-slate-500 dark:text-slate-400">
                    {article.summary}
                  </p>
                  <Link
                    href={
                      uriTemplate(`${FE_URI_GET_SUPPORT_ARTICLE_BY_SLUG}`, {
                        version: APP_SUPPORT_VERSION as string,
                        slug: article.slug,
                      }) || '#'
                    }
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    {/* Read in {article.readTime} */}
                    Read in{' '}
                    {`${article.reading_time} ${word_pluralize(
                      'minute',
                      article.reading_time,
                    )}`}
                  </Link>
                </article>
              ),
            )}
        </div>
      </div>
    </aside>
  );
};
