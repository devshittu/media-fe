import { Button } from '@/components/button';
import { Link } from '@/components/labs/typography';
import React from 'react';
import { Copyright } from '../public-page/copyright';
import { COPYRIGHT_TEXT } from '@/config/constants';

export const Footer = () => {
  const copyrightText = COPYRIGHT_TEXT;
  const links = [
    { href: '/faq', label: 'F.A.Q' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ];
  return (
    <>
      <footer className="relative md:fixed bottom-0 left-0 z-20 w-full bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-600">
        <div className="flex h-full  mx-auto font-medium">
          <div className="px-4 pt-4 mx-auto w-full sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid md:gap-10 md:row-gap-6 mb-2 sm:grid-cols-2 lg:grid-cols-4 justify-between">
              <div className="sm:col-span-2">
                <Link
                  href="/"
                  aria-label="Go home"
                  title="Company"
                  className="inline-flex items-center"
                >
                  <h1 className="text-xl font-bold tracking-wide text-slate-800 dark:text-slate-200 ">
                    {"Stay tuned and stay updated!"}
                    {/* {"Your news, your way, starts now!"} */}
                  </h1>
                </Link>
                <div className="mt-1 lg:max-w-sm">
                  <p className="text-sm text-slate-800 dark:text-slate-200">
                    {" Don't miss out on the latest updates!"}
                    {/* {"Join Media-Fe's vibrant community and immerse yourself in Storylines that evolve with the news. Bookmark, personalize, and stay updated. Your news, your way, starts now!"} */}
                  </p>
                </div>
              </div>
              <div></div>
              <div>
                <div className="flex items-center mt-1 space-x-3">
                  <ul className="flex items-center md:hidden md:ml-auto space-x-8 lg:flex">
                    <li>
                      <Button
                        // href="/"
                        aria-label="Sign in"
                        title="Sign in"
                        className="font-medium tracking-wide text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:text-cyan-400"
                      >
                        Sign in
                      </Button>
                    </li>
                    <li>
                      <Button
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-slate-100 dark:text-slate-900 transition duration-200 shadow-md bg-cyan-400 hover:bg-cyan-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        outlined
                        type="primary"
                      >
                        Sign up
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Copyright text={copyrightText} links={links} />
          </div>
        </div>
      </footer>
    </>
  );
};

// Path: src/components/labs/LandingPage/footer.tsx
