import { HomeIcon, Icon, AppLogoIcon } from '@/components/illustrations';
import { Link } from '@/components/labs/typography';
import React from 'react';
import { Marquee } from './marquee';
import { useCategoryContext } from '@/features/categories/hooks';
import { LoginSection } from '@/features/auth/components/login-form/login-section';

export const LeftColumnContent = () => {
  const { categories } = useCategoryContext();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-between flex-grow w-full mx-12">
        {/* Header */}
        <div className="flex items-center justify-between w-full px-4 my-6 sm:px-8">
          <Link
            title="Go to career site"
            className="w-35 text-company-secondary-bg hover:opacity-75"
            href="/stories"
          >
            <Icon icon={<HomeIcon />} className="w-6" strokeWidth={2.5} />
          </Link>

          <Link
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center lg:mx-auto"
          >
            <AppLogoIcon strokeWidth={2} />
            <span className="ml-2 text-xl font-bold tracking-wide uppercase">
              Media Inc.
            </span>
          </Link>

          <span className="w-35"></span>
        </div>

        {/* Body */}

        {/* Marquee */}

        <Marquee play speed="slowest" hoverToPause>
          {categories.map((item, index) => (
            <Link
              key={index}
              href="/"
              aria-label="View Item"
              className="inline-flex items-center px-2 py-1x mr-2 lg:mr-0 text-sm lg:text-xl font-medium text-slate-800  dark:text-slate-300  border-2 border-slate-600 dark:border-slate-400"
            >
              {item.title}
            </Link>
          ))}
        </Marquee>
        <Marquee play speed="slowest" hoverToPause reverse>
          {categories.map((item, index) => (
            <Link
              key={index}
              href="/"
              aria-label="View Item"
              className="inline-flex items-center px-2 py-1x mr-2 lg:mr-0 text-sm lg:text-xl font-medium text-slate-800 roundedx  bg-slate-100x dark:bg-slate-700x dark:text-slate-300  border-2 border-slate-600 dark:border-slate-400"
            >
              {item.title}
            </Link>
          ))}
        </Marquee>

        <LoginSection />
      </div>
    </div>
  );
};

// Path: src/components/labs/LandingPage/left-column-content.tsx
