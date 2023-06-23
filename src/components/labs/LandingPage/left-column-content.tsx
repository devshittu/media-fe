import { HomeIcon, Icon, TwitterIcon } from '@/components/illustrations';
import { Button } from '@/components/button';
import { InputField } from '@/components/form';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LinedBackgroundText } from '../typography';
import Marquee from './marquee';
import { CategoryItem, getCategories } from '@/testing';
import {
  AppLogoIcon,
  GoogleIcon,
} from '@/components/illustrations/icons/social';

const LeftColumnContent = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  useEffect(() => {
    getCategories().then((res) => {
      console.log('res', res);
      setCategories(res);
    });
  }, []);
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
            <Icon icon={<HomeIcon />} />
          </Link>

          <Link
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center lg:mx-auto"
          >
            <AppLogoIcon strokeWidth={2} />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Media Inc.
            </span>
          </Link>

          <span className="w-35"></span>
        </div>

        {/* Body */}

        {/* Marquee */}

        <Marquee play speed="slowest" hoverToPause>
          {/* {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}> */}
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
          {/* </React.Fragment>
        ))} */}
        </Marquee>

        <div className="w-full max-w-[500px]">
          <form className="flex flex-col justify-center overflow-hidden w-full relative">
            <div className="w-full p-6">
              <h1 className="mb-6 text-3xl font-bold leading-tight text-center">
                Connect with us
              </h1>
              <InputField
                required
                placeholder="Enter your email to continue..."
                type="email"
                name="candidate[email]"
                id="candidate_email"
              />

              <Button
                type="primary"
                nativeType="submit"
                className="justify-center font-semibold mt-4 w-full"
              >
                <span className="opacity-100 transition transition-opacity">
                  Connect
                </span>{' '}
                <span
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition transition-opacity"
                  data-connect--form-target="submitLoader"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 animate-spin currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"></path>
                  </svg>
                </span>
              </Button>
              <LinedBackgroundText>or continue with</LinedBackgroundText>
              <div className="flex justify-center -mx-2">
                <Link className="p-0 mx-2 shadow" title="Facebook" href="#">
                  <span className="flex items-center justify-center w-full h-full px-4 py-3">
                    <Icon icon={<GoogleIcon className="w-6 h-6 mr-2" />} />
                    Google
                  </span>
                </Link>{' '}
                <Link className="p-0 mx-2 shadow" title="LinkedIn" href="#">
                  <span className="flex items-center justify-center w-full h-full px-4 py-3">
                    <TwitterIcon className="w-6 h-6 mr-2" />
                    Twitter
                    {/* <Image className="w-auto h-full" src="https://assets.teamtailor-cdn.com/assets/connect/social/linkedin-1827062cef96d04650b14cb68f91f5e83bd5888170b386ac28b3482e6bad136d.png"> */}
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <p className="my-6 mt-0 text-gray-600 sm:my-12 sm:mt-3">
          Already registered? <Link href="/en-GB/auth/login">Sign in</Link>.
        </p>

        {/* <Marquee items={categories} hoverToPause speed="slow" />
        <Marquee items={categories} hoverToPause speed="normal" reverse /> */}
      </div>
    </div>
  );
};
export default LeftColumnContent;
