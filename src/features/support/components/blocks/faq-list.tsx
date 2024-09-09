'use client';
import React, { useMemo } from 'react';
import { FAQ, useGetSupportFAQs } from '@/features/support';
import { AccordionItem } from '@/components/blocks/accordion';
import { LoadingButtonTextList } from '@/components/loading';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import { AccordionItemSkeleton } from '../loading';

export const FAQList = () => {
  const { data: responseData, isLoading } = useGetSupportFAQs({
    params: {
      page_size: 15,
      document: 'faq',
      version: `${APP_SUPPORT_VERSION}`,
    },
  }); // Use data and isLoading directly from the hook

  const stableFAQs = useMemo(
    () => responseData?.results,
    [responseData?.results],
  );

  return (
    <>
      <div className="space-y-4">
        {isLoading && (
          <>
            <AccordionItemSkeleton />
            <AccordionItemSkeleton />
            <AccordionItemSkeleton />
          </>
        )}
        {stableFAQs?.length > 0 &&
          stableFAQs.map((faq: FAQ, index: number) => (
            <AccordionItem
              key={index}
              title={faq.question}
              content={faq.answer}
            />
          ))}
      </div>
    </>
  );
};
// src/features/support/components/blocks/faq-list.tsx
