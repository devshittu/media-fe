import {
  ArrowRightIcon,
  ChevronRightIcon,
  Icon,
} from '@/components/illustrations';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
interface AccordionItemProps {
  title: string;
  content: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
        <ReactMarkdown>{content}</ReactMarkdown>
      </p>
    </details>
  );
};

export default AccordionItem;
