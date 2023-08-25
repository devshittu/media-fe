import React from 'react';

type DialogContainerProps = React.HTMLProps<HTMLDivElement> & {
  rounded?: boolean;
};

export const DialogContainer = React.forwardRef<
  HTMLDivElement,
  DialogContainerProps
>(({ rounded, children, ...props }, ref) => {
  return (
    <div
      className={`flex flex-col w-full mx-auto outline-none bg-slate-50 dark:bg-slate-950 max-h-[calc(100%-56px)] overflow-y-hidden shadow-lg max-w-4xl ${
        rounded ? 'rounded-2xl' : ''
      } z-[9999]`}
      data-app-dialog="true"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="app__container_errors_label"
      aria-describedby="app__container_errors_desc"
      aria-modal="true"
      ref={ref}
      {...props}
    >
      <div className="relative border-cyan-500 dark:border-cyan-700 border-t-8 after:absolute after:top-0 after:right-0 after:w-full after:z-10 after:border-t after:border-transparent"></div>
      <div
        className="overflow-y-auto border-0 m-0 py-5 px-4 h-full flex flex-col"
        data-app-dialog-content="true"
      >
        {children}
      </div>
    </div>
  );
});

DialogContainer.displayName = 'DialogContainer';
