import React from 'react';

type ContentSectionProps = {
  children: React.ReactNode;
};

export const ContentSection: React.FC<ContentSectionProps> = ({ children }) => {
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-slate-900">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          {children}
        </article>
      </div>
    </main>
  );
};

type TopicContentSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const TopicContentSection = ({
  title,
  description,
  children,
}: TopicContentSectionProps) => {
  return (
    <section className="text-slate-600 body-font">
      {/* <div className="container px-5 py-24 mx-auto"> */}
      <div className="container mx-auto flex flex-col gap-4 items-start px-4 py-5 md:py-10 md:px-10 lg:px-32 xl:max-w-3xlx">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
        <p className="text-base md:text-lg leading-relaxed w-full xl:w-3/4 lg:w-4/5 text-slate-700 dark:text-slate-300">
          {description}
        </p>
        <div className=" w-full lg:w-4/5">{children}</div>
      </div>
    </section>
  );
};
