import {
  NavDrawerLeft,
  NavDrawerTop,
  NavDrawerRight,
  NavMain,
} from '@/components/blocks/nav';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem } from '@/components/blocks/stories';
import { useScrollBehavior } from '@/hooks';
import Link from 'next/link';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import { Toast } from '@/components/blocks/toast';
import { Button } from '@/components/button';
import { ReactElement, useEffect, useRef, useState } from 'react';
import PublicLayout from '@/layouts/public-layout';
import MainMenu from '@/components/menus/main-menu';

const Index = () => {
  const { isScrolledUp, yPosition, initialScrollPosition } =
    useScrollBehavior();
  const headerRef = useRef<HTMLElement>(null);
  const [x, setX] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  function growInternalVariable(y: number) {
    let internalVariable = 0; // Initial value of the internal variable

    // Check if y is within the allowed range
    if (Number.isInteger(y)) {
      // Calculate the potential new value of the internal variable
      const potentialValue = internalVariable + y;

      // Determine the new value based on the potential value and the constraints
      if (potentialValue <= 50 && potentialValue >= 0) {
        internalVariable = potentialValue;
      } else if (potentialValue > 50) {
        internalVariable = 50;
      } else {
        internalVariable = 0;
      }
    } else {
      console.log('Invalid value for y. y should be an integer.');
    }

    return internalVariable;
  }

  function calculateX(x:number, y:number, scrollDirection: string) {
    const minX = -50;
    const minY = 0;
    let keepX = 0;

    // If y changes positively and x is at the lowest range, x remains at the lowest range
    if (scrollDirection === 'down' && y > minY && x === minX) {
      return minX;
    }

    // If y increases, update x accordingly
    if (scrollDirection === 'down' && y > x + minY) {
      console.log('y increasing and x is at, ', keepX, ' moving x is ', x);
      const difference = y - x - minY;
      const increments = Math.ceil(difference / 20);
      const newX = Math.max(minX, x - increments);
      keepX = newX;
      return newX;
    }

    // If y decreases, update x accordingly
    // if (scrollDirection === 'up' && y < x + minY) {
    if (scrollDirection === 'up') {
      console.log('y decreasing and x is at, ', keepX, ' moving x is ', x);
      const difference = x + minY - y;
      const increments = Math.ceil(difference / 20);
      const newX = Math.min(0, x + increments);
      return newX;
    }

    // If none of the conditions match, return the current value of x
    return x;
  }

  useEffect(() => {
    const handleScroll = () => {
      let prevScroll = 0;
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      let scrollDirection = '';

      if (currentScroll > prevScroll) {
        // Scrolling down
        scrollDirection = 'down';
      } else {
        // Scrolling up
        scrollDirection = 'up';
      }

      prevScroll = currentScroll;

      const x = calculateX(0, currentScroll, scrollDirection);
      // Apply the transformation to the header element
      if (headerRef.current) {
        console.log(
          'headerRef.current.style.transform: ',
          headerRef.current.style.transform,
        );
        // Calculate the value of x using the calculateX function
        // const x = calculateX(headerRef.current.style.transform, currentScroll, scrollDirection);

        setX(x);
        console.log('x', x);
        // headerRef.current.style.transform = `translateY(${x}px)`;
      }

       const headerHeightValue = growInternalVariable(yPosition-initialScrollPosition);
        setHeaderHeight(headerHeightValue);
        console.log('headerHeightValue: ', headerHeightValue);
      // console.log(x);
    };
    // Attach the event listener to the scroll event
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Detach the event listener on component unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, [yPosition, isScrolledUp, initialScrollPosition]);
  const handleToastClose = () => {
    console.log('Toast closed');
  };
  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: 'bottom-center',
      type: 'success',
      onClose: () => {
        // Handle close event
        handleToastClose();
      },
      duration: 5000,
    });

    notify.open();
  };

  const loadLatest = () => {
    console.log('Loading latest');
  };
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        {/* Desktop */}
        {/* ${
                  isScrolledUp || yPosition < 100
                    ? ' translate-y-0 '
                    : ` translate-y-[${-53}px]`
                } 
        */}
        <header
          ref={headerRef}
          className={`hidden lg:block sticky top-0 w-full backdrop-blur flex-none  transition-all  duration-350x ease-out transform translate-x-0 translate-z-0  lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75`}
          style={{ transform: `translateY(${isScrolledUp ? '0' : ` ${x}`}px)` }}
        >
          <div className={`transition-all duration-350 ease-out`}>
            <h1 className="mb-4x text-4xlx text-xl p-4 pl-8 font-extrabold leading-none tracking-tight text-slate-900 md:text-5xlx lg:text-6xlx dark:text-white">
              Home
            </h1>
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
        {/* mobile */}
        <header
          className={`lg:hidden fixed left-0 top-[-1.5px] z-30
               w-full backdrop-blur flex-none transition-all duration-350 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
              transform translate-x-0 translate-z-0 
              ${
                isScrolledUp || yPosition < 100
                  ? 'translate-y-0 '
                  : 'translate-y-[-53px]'
              }`}
        >
          <div className={`flex items-center p-4 lg:hidden `}>
            <NavDrawerLeft id="right" title="Menu">
              <MainMenu />
            </NavDrawerLeft>
            <NavDrawerRight id="right" title="Menu">
              <MainMenu />
            </NavDrawerRight>
            <NavDrawerTop id="right" title="Menu">
              <MenuTop />
            </NavDrawerTop>
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
              <Button onClick={loadLatest}>Load new feeds</Button>
              <Button onClick={ShowToast}>Show Toast</Button>
            </div>
            <article>
              <StoryItem />
              {/* <StoryItem2 /> */}
              <StoryItem />
              <StoryItem />
              <StoryItem />
              <StoryItem />
            </article>
          </div>
        </section>
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <SidePanel />
      </div>
    </div>
  );
};

const MenuTop = () => {
  return (
    <>
      <p className="max-w-lg mb-6 text-sm text-slate-500 dark:text-slate-400">
        Supercharge your hiring by taking advantage of our{' '}
        <Link
          href="#"
          className="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline"
        >
          limited-time sale
        </Link>{' '}
        for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked
        candidates and the #1 design job board.
      </p>
      <Link
        href="#"
        className="px-4 py-2 mr-2 text-sm font-medium text-center text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700"
      >
        Learn more
      </Link>
      <Link
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Get access{' '}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Index;
