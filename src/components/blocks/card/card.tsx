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
} & HTMLAttributes<HTMLDivElement>;

type CardContextType = {
  open: boolean;
  toggleOpen: () => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

type CardHeaderProps = {
  children: ReactNode;
};

type CardBodyProps = {
  children: ReactNode;
};

type CardFooterProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = forwardRef(
  (
    { heading, description, footer, children, ...rest },
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
        className="card max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow dark:bg-slate-800 dark:border-slate-700"
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
    <div className={`card-body${open ? ' open' : ''} mb-3 `}>
      {React.Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { open }),
      )}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({ children, ...props }) => {
  const { open } = useCardContext();

  return (
    <div
      className={`card-footer${
        open ? ' open' : ''
      } flex items-center justify-between`}
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
