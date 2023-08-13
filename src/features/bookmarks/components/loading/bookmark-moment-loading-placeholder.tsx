import React from 'react';

export const BookmarkMomentLoadingPlaceholder = () => {
  return (
    <section className="flex flex-col space-y-5 animate-pulse">
      <div className="p-5x">
        <div className="ml-4 mt-4 w-20 h-4 bg-slate-200 dark:bg-slate-700"></div>
        <ol className="mt-3 divide-y divide-slate-200 dark:divide-slate-700">
          {[...Array(3)].map((_, idx) => (
            <li key={idx}>
              <div className=" block bg-slate-100x dark:bg-slate-700x">
                <div className="mx-4 items-center block p-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 w-full mb-2"></div>

                  {/* <div className="grid max-w-full grid-cols-4 gap-1 p-1 mx-auto my-2 bg-slate-100 dark:bg-slate-600">
                    <div className="px-3 py-1.5 h-5 w-5 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="px-3 py-1.5 h-5 w-5 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="px-3 py-1.5 h-5 w-5 bg-slate-900 dark:bg-slate-300"></div>
                    <div className="px-3 py-1.5 h-5 w-5 bg-slate-200 dark:bg-slate-700"></div>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <span className="sr-only">Loading...</span>
    </section>
  );
};
