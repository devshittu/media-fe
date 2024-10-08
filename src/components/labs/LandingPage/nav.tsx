'use client';
import { Button } from '@/components/button';
import { AppLogoIcon, Icon } from '@/components/illustrations';
import { Link } from '@/components/labs/typography';
import { useState } from 'react';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative grid items-center grid-cols-2 lg:grid-cols-3">
        <ul className="flex items-center space-x-8 lg:flex">
          <li>
            <Link
              href="/stories"
              aria-label="Our product"
              title="Our product"
              className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Stories
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              aria-label="Our product"
              title="Our product"
              className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              aria-label="Product pricing"
              title="Product pricing"
              className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              FAQ
            </Link>
          </li>
        </ul>
        <Link
          href="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center lg:mx-auto"
        >
          <Icon icon={<AppLogoIcon />} className="w-8" strokeWidth={3} />
          <span className="ml-2 text-xl font-bold tracking-wide text-slate-800 uppercase">
            Company
          </span>
        </Link>
        <ul className="flex items-center ml-auto space-x-8 lg:flex">
          <li>
            <Link
              href="/auth/signup"
              aria-label="Sign in"
              title="Sign in"
              className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Button
              id={`nav-sign-up`}
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-whitex transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              outlined
            >
              Sign up
            </Button>
          </li>
        </ul>
        <div className="ml-auto lg:hidden">
          <Button
            id={`nav-menu-button`}
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-slate-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </Button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-20">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-8 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span className="ml-2 text-xl font-bold tracking-wide text-slate-800 uppercase">
                        Company
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-slate-200 focus:bg-slate-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-slate-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        aria-label="Product pricing"
                        title="Product pricing"
                        className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        aria-label="Sign in"
                        title="Sign in"
                        className="font-medium tracking-wide text-slate-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="Sign up"
                      >
                        Sign up
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Path: src/components/labs/LandingPage/nav.tsx
