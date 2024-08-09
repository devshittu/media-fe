'use client';
import { InputField } from '@/components';
import { SearchIcon } from '@/components/illustrations';
import { TopicContentSection } from '@/components/labs/public-page';
import React, { useState } from 'react'; // Import your SearchIcon component

export const SearchSection = () => {
  const title = 'Find Answers Instantly';
  const description =
    'Quickly find what you need with our search tool. Dive into our knowledge base for fast, accurate answers to your queries.';
  const fullDescription =
    "Looking for specific information? Our powerful search tool helps you quickly navigate through our extensive knowledge base to find exactly what you need. Whether it's detailed guides, quick tips, or comprehensive solutions, your answers are just a search away.";
  const [searchTerm, setSearchTerm] = useState('');

  //   const handleSearchChange = (e) => {
  //     setSearchTerm(e.target.value);
  //   };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  };

  return (
    <TopicContentSection title={title} description={description}>
      <>
        <div className="search-container p-2x sm:w-2/3 w-full">
          <InputField
            type="text"
            name="search"
            placeholder="Search help center..."
            // value={searchTerm}
            // onChange={handleSearchChange}
            actionIcon={<SearchIcon strokeWidth={3} />}
            onActionClick={handleSearch}
            actionIconAriaLabel="Search"
          />
        </div>

        <div className="py-4 md:py-8">
          <p className="text-base md:text-lg leading-relaxed w-full xl:w-3/4 lg:w-4/5 text-slate-700 dark:text-slate-300">
            {fullDescription}
          </p>
        </div>
      </>
    </TopicContentSection>
  );
};
