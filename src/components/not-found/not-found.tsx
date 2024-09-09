'use client';
import { Button } from '@/components/button';
import React from 'react';
import { Link } from '../labs/typography';

export type NotFoundProps = {
  errorCode?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
};

export const NotFound: React.FC<NotFoundProps> = ({
  errorCode = '404',
  title = `Sorry, we couldn't find this page.`,
  subtitle = 'Error',
  description = 'But don’t worry, you can find plenty of other things on our homepage.',
  primaryAction = {
    label: 'Back to homepage',
    href: '/',
  },
  secondaryAction,
}) => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-slate-900 dark:text-slate-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-slate-600">
            <span className="sr-only">{subtitle}</span>
            {errorCode}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{title}</p>
          <p className="mt-4 mb-8 dark:text-slate-400">{description}</p>
          <div className="flex justify-evenly">
            {primaryAction.href ? (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-slate-50 dark:text-slate-900 transition duration-200 shadow-md bg-cyan-400 hover:bg-cyan-700 focus:shadow-outline focus:outline-none"
                aria-label={primaryAction.label}
                onClick={primaryAction.onClick}
              >
                <span className="font-inter font-extrabold">
                  {primaryAction.label}
                </span>
              </Link>
            ) : (
              <Button
                id={`primary-button-error-page`}
                type="primary"
                nativeType="button"
                className="justify-center font-semibold md:h-12"
                onClick={primaryAction.onClick}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl font-inter ">
                  {primaryAction.label}
                </span>
              </Button>
            )}

            {secondaryAction && (
              <>
                <Button
                  id={`secondary-button-error-page`}
                  nativeType="button"
                  className="justify-center font-semibold md:h-12"
                  onClick={secondaryAction.onClick}
                >
                  <span className="opacity-100 transition-opacity font-extrabold text-xl">
                    {secondaryAction.label}
                  </span>{' '}
                </Button>

                {/* <Link
              href={secondaryAction.href || '/'}
              className="mt-4 px-8 py-3 font-semibold rounded dark:bg-slate-700 dark:text-slate-100"
              
              aria-label={secondaryAction.label}
            >
              <span className="opacity-100 transition-opacity font-extrabold text-xl">
              {secondaryAction.label}
              </span>
            </Link> */}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// src/components/not-found/not-found.tsx
