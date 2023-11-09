import React, { useMemo } from 'react';
import { FAQ, useGetSupportFAQs } from '@/features/support';
import { AccordionItem } from '@/components/blocks/accordion';
import { LoadingButtonTextList } from '@/components/loading';

export const FAQList = () => {
      const { data: responseData, isLoading } = useGetSupportFAQs({
    params: { page_size: 15 },
  }); // Use data and isLoading directly from the hook

  const stableFAQs = useMemo(
    () => responseData?.results,
    [responseData?.results],
  );
  return (
    <div className="space-y-4">

        {isLoading && <LoadingButtonTextList wrapped />}
        {stableFAQs?.length > 0 && stableFAQs.map((faq: FAQ, index: number) => (
        <AccordionItem
          key={index}
          title={faq.question}
          content={faq.answer}
        />
        ))
        }
    </div>
  );
};
