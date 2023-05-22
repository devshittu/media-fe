import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InputField } from '@/components/form';
import { Button } from '@/components/button';

export const SidePanel = () => {
  return (
    <div className="flex-1 py-4 space-y-4 hidden md:block">
      <div className="sticky top-0 pb-2">
        <InputField name="Search" placeholder="Search app" className="mb-11" />
        {/* <input
                  type="text"
                  className="block text-black border dark:border-slate-700 bg-slate-200 dark:bg-slate-800 w-full py-2 pl-3 rounded-3xl z-30"
                  name="fullname"
                  placeholder="Search App"
                /> */}
      </div>
      <div className="">
        <div className="block bg-slate-50 py-2  px-2 rounded-2xl shadow-sm">
          <p className="font-extrabold text-lg">Trends for you</p>
        </div>
      </div>
      <div className="block bg-slate-50 dark:bg-slate-800 py-2  sticky top-16 px-2 rounded-2xl shadow-sm">
        <div className="border-b py-2">
          <h1 className="font-extrabold text-lg">Who to follow</h1>
        </div>
        <div className=" border-b border-slate-200 dark:border-slate-700 items-center justify-between flex py-4 px-2">
          <div className="flex space-x-4">
            <Image
              width="48"
              height="48"
              className="rounded-md"
              src="https://dummyimage.com/100x100?text=user"
              alt=""
            />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Display Name
              </p>
              <span className="text-slate-600 dark:text-slate-300">
                @username
              </span>
            </div>
          </div>

          <div>
            <Button className="rounded-lg">Follow</Button>
          </div>
        </div>
        <div className=" border-b border-slate-200 dark:border-slate-700 items-center justify-between flex py-4 px-2">
          <div className="flex space-x-4">
            <Image
              width="48"
              height="48"
              className="rounded-md"
              src="https://dummyimage.com/100x100?text=user"
              alt=""
            />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Display Name
              </p>
              <span className="text-slate-600 dark:text-slate-300">
                @username
              </span>
            </div>
          </div>

          <div>
            <Button className="rounded-lg">Follow</Button>
          </div>
        </div>
        <div className=" border-b border-slate-200 dark:border-slate-700 items-center justify-between flex py-4 px-2">
          <div className="flex space-x-4">
            <Image
              width="48"
              height="48"
              className="rounded-md"
              src="https://dummyimage.com/100x100?text=user"
              alt=""
            />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Display Name
              </p>
              <span className="text-slate-600 dark:text-slate-300">
                @username
              </span>
            </div>
          </div>

          <div>
            <Button className="rounded-lg">Follow</Button>
          </div>
        </div>
        <div className="px-2">
          <p className="text-sm font-bold text-blue-400 py-3">See more</p>
        </div>
      </div>
    </div>
  );
};
