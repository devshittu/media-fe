import React from 'react';

type ContentSectionProps = {
  children: React.ReactNode;
};

export const ContentSection: React.FC<ContentSectionProps> = ({ children }) => {

  return (
    <section className="text-slate-600 body-font">
      <div className="container mx-auto flex flex-col gap-4 items-start px-4 py-5 md:py-10 md:px-10 lg:px-32 xl:max-w-3xlx">
        <div className=" w-full 2xl:w-4/5  lg:my-4">{children}</div>
      </div>
    </section>)
};

type TopicContentSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  hint?: React.ReactNode;
};

export const TopicContentSection = ({
  title,
  description,
  children,
  hint,
}: TopicContentSectionProps) => {
  return (
    <section className="text-slate-600 body-font">
      <div className="container mx-auto flex flex-col gap-4 items-start px-4 py-5 md:py-10 md:px-10 lg:px-32 xl:max-w-3xlx">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed w-full xl:w-3/4 lg:w-4/5 mb-2 lg:mb-4 text-slate-700 dark:text-slate-300">
          {description}
        </p>
        <div className=" w-full 2xl:w-4/5  lg:my-4">{children}</div>

        {hint && (
          <div className=" max-w-screen-sm text-sm text-left text-slate-500 dark:text-slate-300">
            {hint}
          </div>
        )}
      </div>
    </section>
  );
};
