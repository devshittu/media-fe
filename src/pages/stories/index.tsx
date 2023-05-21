import { StoryItem, StoryItem2 } from '@/components/blocks/stories';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Index = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12x">
            <div className="md:w-1/2 "><StoryItem/></div>
            <div className="md:w-1/2"><StoryItem2/></div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
