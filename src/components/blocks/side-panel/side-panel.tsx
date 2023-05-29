import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InputField } from '@/components/form';
import { Button } from '@/components/button';
import { useScrollBehavior } from '@/hooks';

export const SidePanel = () => {
  const { isScrolledUp, yPosition, screenHeight } = useScrollBehavior();
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [sidePanelHeight, setSidePanelHeight] = useState<number>(0);

  useEffect(() => {
    if (sidePanelRef.current) {
      setSidePanelHeight(sidePanelRef.current.clientHeight);
    }
  }, []);

  // console.log('screenHeight', screenHeight);
  // console.log('sidePanelHeight', sidePanelHeight);
  // console.log('screenHeight', screenHeight);
  return (
    <div className="flex-1 pb-16 hidden lg:block">
      {/* <div className={`sticky top-0 pb-2 `}> */}
      <div className={`sticky top-0 z-10 pb-2 bg-white dark:bg-slate-900`}>
        <div className="py-4">
          <InputField name="Search" placeholder="Search app" className="mb-4" />
        </div>
      </div>
      <div className=" space-y-4 min-h-screen sticky top-40" ref={sidePanelRef}>
        {/* ${
          isScrolledUp ? 'sticky top-12 mt-16' : ''
        } */}
        <div className={` bg-slate-50 dark:bg-slate-800 `}>
          <div className="block py-2  px-2 rounded-2xl shadow-sm">
            <p className={`font-extrabold text-lg `}>Trends for you</p>
          </div>
        </div>
        {/*  ${
          isScrolledUp ? ' top-80 ' : ' top-24'
        }  */}
        <div
          className={`stickyx block bg-slate-50 dark:bg-slate-800 py-2 ease-in transition-all duration-300 px-2x rounded-2xlx shadow-sm`}
        >
          <div className="border-b py-2 border-slate-200 dark:border-slate-700 ">
            <h1 className="font-extrabold text-xl">Who to follow</h1>
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
    </div>
  );
};
