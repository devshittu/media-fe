import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const StoryItem2 = () => {
  return (
    <article className="flex flex-col items-start">
      <span className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest">
        CATEGORY
      </span>
      <h2 className="sm:text-3xl text-2xl title-font font-medium text-slate-900 mt-4 mb-4">
        Pinterest DIY dreamcatcher gentrify single-origin coffee
      </h2>
      <p className="leading-relaxed mb-8">
        {`Live-edge letterpress cliche, salvia fanny pack humblebrag
                narwhal portland. VHS man braid palo santo hoodie brunch trust
                fund. Bitters hashtag waistcoat fashion axe chia unicorn. Plaid
                fixie chambray 90's, slow-carb etsy tumeric.`}
      </p>

      <section className="text-slate-600 body-font  mb-8">
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width="500"
                height="00"
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/500x300"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width="500"
                height="00"
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/501x301"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <Image
                width="500"
                height="00"
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://dummyimage.com/600x360"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <Image
                width="500"
                height="00"
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://dummyimage.com/601x361"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width="500"
                height="00"
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/502x302"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width="500"
                height="00"
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://dummyimage.com/503x303"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 mt-auto w-full">
        <Link href="/" className="text-blue-500 inline-flex items-center">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-slate-200">
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          1.2K
        </span>
        <span className="text-slate-400 inline-flex items-center leading-none text-sm">
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
          </svg>
          6
        </span>
      </div>
      <Link href="/" className="inline-flex items-center">
        <Image
          width="104"
          height="104"
          alt="blog"
          src="https://dummyimage.com/103x103"
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-slate-900">
            Alper Kamu
          </span>
          <span className="text-slate-400 text-xs tracking-widest mt-0.5">
            DESIGNER
          </span>
        </span>
      </Link>
    </article>
  );
};
export const StoryItem = () => {
  return (
    <article className="p-4 md:p-8 lg:p-12 flex flex-col items-start  border-b-2 border-slate-100 dark:border-slate-800 ">
      <span className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest">
        CATEGORY
      </span>
      <h2 className="sm:text-3xl text-2xl title-font mt-4 mb-4  font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
        Roof party normcore before they sold out, cornhole vape
      </h2>
      <p className="leading-relaxed mb-8 text-justify">
        {`Live-edge letterpress cliche, salvia fanny pack humblebrag
                narwhal portland. VHS man braid palo santo hoodie brunch trust
                fund. Bitters hashtag waistcoat fashion axe chia unicorn. Plaid
                fixie chambray 90's, slow-carb etsy tumeric. Cray pug you
                probably haven't heard of them hexagon kickstarter craft beer
                pork chic.`}
      </p>

      <div className="text-slate-400 font-medium text-sm mb-8 mt-6x mx-3x px-2x">
        <div className="grid grid-cols-6 col-span-2   gap-2  ">
          <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
            <Image
              width="500"
              height="00"
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
              alt=""
            />
          </div>
          <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
            <Image
              width="500"
              height="00"
              className="h-full w-full object-cover  "
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1399&amp;q=80"
              alt=""
            />
          </div>
          <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
            <Image
              width="500"
              height="00"
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt=""
            />
          </div>
          <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
            <Image
              width="500"
              height="00"
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
              alt=""
            />
          </div>
          <div className="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
            <Image
              width="500"
              height="00"
              className="h-full w-full object-cover "
              src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=765&amp;q=80"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
        <Link href="/" className="text-blue-500 inline-flex items-center">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2  border-slate-200 dark:border-slate-700">
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          1.2K
        </span>
        <span className="text-slate-400 inline-flex items-center leading-none text-sm">
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
          </svg>
          6
        </span>
      </div>
      <Link href="/" className="inline-flex items-center">
        <Image
          width="104"
          height="104"
          alt="blog"
          src="https://dummyimage.com/104x104"
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-slate-900">
            Holden Caulfield
          </span>
          <span className="text-slate-400 text-xs tracking-widest mt-0.5">
            UI DEVELOPER
          </span>
        </span>
      </Link>
    </article>
  );
};
