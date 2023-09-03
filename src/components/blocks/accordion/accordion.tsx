import React from 'react';
import AccordionItem from './accordion-item';

interface AccordionProps {
  items: { title: string; content: string }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
