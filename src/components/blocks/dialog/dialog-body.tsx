import React from 'react';

type DialogBodyProps = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  (props, ref) => {
    return (
      <div className="relative flex-auto" ref={ref} {...props}>
        {/* <h5 className="mt-0 font-medium leading-relaxed text-xl mb-2">
          Body Title
        </h5> */}
        <div>{props.children}</div>
      </div>
    );
  },
);

DialogBody.displayName = 'DialogBody';
