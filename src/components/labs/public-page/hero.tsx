import Breadcrumb, {
  BreadcrumbTrail,
} from '@/components/blocks/breadcrumb/breadcrumb';
import React from 'react';

type HeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbTrail?: BreadcrumbTrail[];
};

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  breadcrumbTrail,
}) => {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto flex flex-col gap-4 items-start px-4 py-5 md:py-10 md:px-10 lg:px-32 xl:max-w-3xlx">
        {/* Render the Breadcrumb component */}
        {/* {breadcrumbTrail && <Breadcrumb trails={breadcrumbTrail} />} */}
        {breadcrumbTrail && <Breadcrumb />}

        <h1 className="text-4xl font-bold md:leading-normal sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lgx text-slate-600 dark:text-slate-100">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;

// Path: src/components/labs/public-page/hero.tsx
