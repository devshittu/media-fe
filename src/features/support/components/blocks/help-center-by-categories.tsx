// Import React and necessary types
import { Button } from '@/components/button';
import { ArrowRightCircleIcon } from '@/components/illustrations';
import { TopicContentSection } from '@/components/labs/public-page';
import React from 'react';
import { SupportCategory, SupportCategoryListResponse } from '../../types';
import { Link } from '@/components/labs';
import { FE_URI_GET_SUPPORT_ARTICLES_BY_CATEGORY_SLUG } from '@/config/frontend-uri-constants';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import { uriTemplate } from '@/utils';

// Define the types for your props
type HelpCenterSectionProps = {
  categories: SupportCategory[];
};

export const HelpCenterSection = ({ categories }: HelpCenterSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4 ">
        {categories.map((category, index) => (
          <div key={index} className="w-full ">
            <div className="bg-slate-100 dark:bg-slate-900 flex p-4 h-full items-center">
              <ArrowRightCircleIcon
                className="text-cyan-500 w-6 h-6 flex-shrink-0 mr-4"
                strokeWidth={2.5}
              />
              <Link
                href={
                  uriTemplate(
                    `${FE_URI_GET_SUPPORT_ARTICLES_BY_CATEGORY_SLUG}`,
                    {
                      version: APP_SUPPORT_VERSION as string,
                      category_slug: category.slug,
                    },
                  ) || '#'
                }
                className="hover:underline underline-offset-2"
              >
                <span className="font-inter font-medium text-slate-600 dark:text-slate-400">
                  {category.name}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mx-auto jus">
        <Button size="large" type={'primary'} outlined>
          Button
        </Button>
      </div>
    </>
  );
};
