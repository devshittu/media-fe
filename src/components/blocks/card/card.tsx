'use client';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  forwardRef,
  ForwardedRef,
  HTMLAttributes,
  cloneElement,
} from 'react';

type CardProps = {
  heading: string;
  description: string;
  footer?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

type CardContextType = {
  open: boolean;
  toggleOpen: () => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
};

type CardBodyProps = {
  children: ReactNode;
  className?: string;
};

type CardFooterProps = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = forwardRef(
  (
    { heading, description, footer, className, children, ...rest },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
      setOpen(!open);
    };

    const contextValue: CardContextType = {
      open,
      toggleOpen,
    };

    return (
      <div
        className={`card relative max-w-full min-w-fit p-6 bg-slate-50 borderx border-slate-200x rounded-lgx shadow dark:bg-slate-950 dark:border-slate-700x ${className}`}
        ref={ref}
        {...rest}
      >
        <CardContext.Provider value={contextValue}>
          {children}
        </CardContext.Provider>
      </div>
    );
  },
);
Card.displayName = 'Card';

export const useCardContext = (): CardContextType => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card components must be wrapped by the Card component.');
  }
  return context;
};

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  const { toggleOpen } = useCardContext();

  return (
    <div className="card-header flex items-center justify-between">
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  const { open } = useCardContext();

  return (
    <div className={`card-body${open ? ' open' : ''} mb-10`}>
      {React.Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { open }),
      )}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  const { open } = useCardContext();

  return (
    // <div className="absolute bottom-0 left-0 z-50 w-full h-16x m-4 bg-whitex border-tx border-slate-200 dark:bg-slate-700 dark:border-slate-600">
    // </div>
    <div
      className={`card-footer ${
        open ? ' open' : ''
      }  flex items-center justify-between ${className}`}
      //   {...props}
    >
      {React.Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { open }),
      )}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
