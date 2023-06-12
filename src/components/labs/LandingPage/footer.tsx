import { Button } from '@/components/button';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 left-0 z-50 w-full h-16 lg:h-48 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-600">
        <div className="flex h-full  mx-auto font-medium">
          {/* <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-slate-50 dark:hover:bg-slate-800 group"> </button>*/}

          <div className="px-4 pt-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4 justify-between">
              <div className="sm:col-span-2">
                <Link
                  href="/"
                  aria-label="Go home"
                  title="Company"
                  className="inline-flex items-center"
                >
                  <h1 className="text-xl font-bold tracking-wide text-slate-800 ">
                    Don’t miss what’s happening
                  </h1>
                </Link>
                <div className="mt-1 lg:max-w-sm">
                  <p className="text-sm text-slate-800">
                    People on Twitter are the first to know.
                  </p>
                </div>
              </div>
              <div></div>
              <div>
                <div className="flex items-center mt-1 space-x-3">
                  <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
                    <li>
                      <Link
                        href="/"
                        aria-label="Sign in"
                        title="Sign in"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Button
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-whitex transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        outlined
                      >
                        Sign up
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
              <p className="text-sm">
                © Copyright 2023 MEDIA FE Inc. All rights reserved.
              </p>
              <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row text-sm">
                <li>
                  <Link
                    href="/"
                    className=" transition-colors duration-300 hover:text-cyan-400"
                  >
                    F.A.Q
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className=" transition-colors duration-300 hover:text-cyan-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className=" transition-colors duration-300 hover:text-cyan-400"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-slate-50 dark:hover:bg-slate-800 group"> </button>*/}
        </div>
      </footer>
    </>
  );
};

export default Footer;
