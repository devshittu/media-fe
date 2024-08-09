'use client';
import { ChevronRightIcon, Icon } from '@/components/illustrations';
import { Markdown } from '@/components/markdown';
import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
}

export const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    // Toggle on Enter or Space key press
    if (event.key === 'Enter' || event.key === ' ') {
      toggleAccordion();
    }
  };

  return (
    <details
      className={`w-full border-2 border-slate-700 dark:border-slate-300 rounded-none  ${
        isOpen ? 'border-cyan-600 dark:border-cyan-300' : ''
      }`}
    >
      <summary
        className={`px-4 py-6 focus:outline-none focus-visible:ri cursor-pointer flex items-center justify-between  text-slate-900 dark:text-slate-100`}
        onClick={toggleAccordion}
        onKeyPress={handleKeyPress}
        tabIndex={0} // Make it focusable
        role="button" // Semantically mark as a button for assistive technologies
        aria-expanded={isOpen ? 'true' : 'false'} // Convert boolean to string literals
      >
        <h3 className="mr-2">{title}</h3>

        <Icon
          icon={<ChevronRightIcon />}
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? 'transform rotate-90' : ''
          }`}
        />
      </summary>
      <p
        className={`px-4 py-6 pt-0 ml-4 -mt-4 text-slate-700 dark:text-slate-400 transition-max-height duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <Markdown>{content}</Markdown>
      </p>
    </details>
  );
};

export default AccordionItem;
