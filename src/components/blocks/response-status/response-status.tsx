import React from 'react';
import { Button } from '@/components/button';
import { CheckIcon, Icon, XIcon } from '@/components/illustrations';

type ResponseStatusWidgetProps = {
  isSuccess: boolean;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaOnClick?: () => void;
};

export const ResponseStatusWidget = ({
  isSuccess,
  title,
  subtitle,
  ctaText,
  ctaOnClick,
}: ResponseStatusWidgetProps) => {
  const successImage = (
    <Icon
      icon={<CheckIcon />}
      strokeWidth={3}
      className="w-16 h-16 text-emerald-600"
    />
  );

  const failureImage = (
    <Icon icon={<XIcon />} strokeWidth={3} className="w-16 h-16" />
  );

  return (
    <section className="text-slate-600 dark:text-slate-400 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded">
          {isSuccess ? successImage : failureImage}
        </div>
        <div className="text-center lg:w-2/3 w-full">
          <h1 className=" font-extrabold sm:text-4xl text-3xl mb-4 text-slate-900 dark:text-slate-200">
            {title}
          </h1>
          <p className="mb-8 leading-relaxed">{subtitle}</p>
          <div className="flex justify-center">
            {ctaText && (
              <Button
                id={`action-cta`}
                type="primary"
                nativeType="submit"
                size="large"
                className="justify-center !text-2xlx font-semibold mt-4"
                onClick={ctaOnClick}
              >
                <span className="opacity-100 transition-opacity text-3xl">
                  {ctaText}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
