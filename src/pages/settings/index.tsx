import { NavDrawerLeft } from '@/components/blocks/nav';
import Link from 'next/link';
import { Button } from '@/components/button';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import PublicLayout from '@/layouts/public-layout';
import MainMenu from '@/components/menus/main-menu';
import Checkbox from '@/components/form/checkbox';
import CheckboxGroup from '@/components/form/checkbox-group';
import Radio from '@/components/form/radio';
import RadioGroup from '@/components/form/radio-group';

const Index = () => {
  const headerRef = useRef<HTMLElement>(null);

  const handleCheckboxChange = (checked: Record<string, boolean>) => {
    console.log(`Checkbox is now ${checked ? 'checked' : 'unchecked'}`);
    // Perform any other actions based on the checkbox state
  };
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleCheckboxGroupChange = (checkedItems: any) => {
    console.log('Checked items:', checkedItems);
    // Perform any other actions based on the checked items
  };
  const handleGroupChange = (value: string) => {
    console.log('Selected option:', value);
  };

  const radioOptions = [
    { id: 'Regular', name: 'myGroup', value: 'Regular', label: 'Regular' },
    { id: 'Medium', name: 'myGroup', value: 'Medium', label: 'Medium' },
    {
      id: 'Large',
      name: 'myGroup',
      value: 'Large',
      label: 'Large',
      disabled: false,
    },
    { id: 'XLarge', name: 'myGroup', value: 'XLarge', label: 'XLarge' },
  ];
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px]x box-border border-slate-100 dark:border-slate-800`}
      >
        {/* Desktop */}
        <header
          ref={headerRef}
          className={`hidden lg:block sticky top-0 w-full backdrop-blurx flex-none  transition-all  duration-350x ease-out transform translate-x-0 translate-z-0  lg:z-20 lg:border-bx lg:border-slate-900/10x dark:border-slate-500/40x bg-slate-50/75x dark:bg-slate-900/75x`}
        >
          <div className={`transition-all duration-350 ease-out`}>
            <h1 className="mb-4x text-4xlx text-xl p-4 pl-8 font-extrabold leading-none tracking-tight text-slate-900 md:text-5xlx lg:text-6xlx dark:text-white">
              Settings
            </h1>
          </div>
        </header>
        {/* mobile */}
        <header
          className={`lg:hidden fixed left-0 top-[-1.5px] z-30
               w-full backdrop-blur flex-none transition-all duration-350 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
              transform translate-x-0 translate-z-0 
             `}
        >
          <div className={`flex items-center p-4 lg:hidden `}>
            <NavDrawerLeft id="right" title="Menu">
              <MainMenu />
            </NavDrawerLeft>
            <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
              <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                Home
              </li>
            </ol>
          </div>
          <div>
            <ul
              className="flex justify-around -mb-px text-sm font-medium text-center"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-4 rounded-t-lg border-slate-500 dark:border-slate-200  font-semibold text-slate-900 truncate dark:text-slate-200"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  For You
                </button>
              </li>
              <li role="presentation">
                <button
                  className="inline-block p-4 border-b-4 border-transparent    hover:text-slate-600 hover:border-slate-300 dark:hover:text-slate-300"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Following
                </button>
              </li>
            </ul>
          </div>
        </header>
        <section>
          <div className={`mt-28 lg:mt-0`}>
            <div
              className={`flex align-middle items-center justify-centerx justify-around min-h-[56px]`}
            >
              <Button onClick={() => alert('Load new feeds')}>
                Load new feeds
              </Button>
              <Button onClick={() => alert('Load  ShowToast')}>
                Show Toast
              </Button>
            </div>

            <div className={`flexx flex-colx`}>
              <CheckboxGroup
                options={options}
                onChange={handleCheckboxGroupChange}
              />
              <RadioGroup
                name="myGroup"
                defaultValue="Regular"
                options={radioOptions}
              />

              <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-8 row-gap-5 md:grid-cols-2">
                  <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                    <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-slate-400 group-hover:scale-x-100" />
                    <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-slate-400 group-hover:scale-y-100" />
                    <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-slate-400 group-hover:scale-x-100" />
                    <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-slate-400 group-hover:scale-y-100" />
                    <div className="relative flex flex-col h-full p-5 bg-white rounded-sm lg:items-center lg:flex-row">
                      <div className="mb-6 mr-6 lg:mb-0">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 lg:w-32 lg:h-32">
                          <svg
                            className="w-16 h-16 text-slate-400 lg:w-20 lg:h-20"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                          >
                            <polygon
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                              points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <h6 className="mb-2 font-semibold leading-5">
                            The quick, brown fox jumps over a very lazy dog
                          </h6>
                          <p className="mb-2 text-sm text-gray-900">
                            Cheese on toast airedale the big cheese. Danish
                            fontina cheesy grin airedale danish fontina taleggio
                            the big cheese macaroni cheese port-salut.
                          </p>
                        </div>
                        <Link
                          href="/"
                          aria-label=""
                          className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-slate-400 hover:text-deep-purple-800"
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                    <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-slate-400 group-hover:scale-x-100" />
                    <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-slate-400 group-hover:scale-y-100" />
                    <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-slate-400 group-hover:scale-x-100" />
                    <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-slate-400 group-hover:scale-y-100" />
                    <div className="relative flex flex-col h-full p-5 bg-white rounded-sm lg:items-center lg:flex-row">
                      <div className="mb-6 mr-6 lg:mb-0">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 lg:w-32 lg:h-32">
                          <svg
                            className="w-16 h-16 text-slate-400 lg:w-20 lg:h-20"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                          >
                            <polygon
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                              points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <h6 className="mb-2 font-semibold leading-5">
                            Disrupt inspire and think tank, social
                          </h6>
                          <p className="mb-2 text-sm text-gray-900">
                            A flower in my garden, a mystery in my panties.
                            Heart attack never stopped old Big Bear. I didnt
                            even know we were calling him Big Bear. We never had
                            the chance to.
                          </p>
                        </div>
                        <Link
                          href="/"
                          aria-label=""
                          className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-slate-400 hover:text-deep-purple-800"
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Index;
