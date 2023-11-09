import React from 'react';
import AccordionItem from './accordion-item';
import { FAQ } from '@/features/support';

interface FAQAccordionProps {
  items: FAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question}
          content={item.answer}
        />
      ))}
    </div>
  );
};
