import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Link } from '@/components/labs';
import { Button } from '@/components/button';
import { AppLogoIcon } from '@/components/illustrations';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
import MoreArticles from '@/components/labs/public-page/more-articles';
import { Accordion } from '@/components/blocks/accordion/';
import { ContentSection } from '@/components/labs/public-page';

type PublicFAQPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function Index({ categories }: PublicFAQPageProps) {
  const breadcrumbTrail = [
    { href: '/parent1', label: 'Parent 1' },
    { href: '/parent2', label: 'Parent 2' },
    { href: '/current', label: 'Current' },
  ];
  const footerCategories = [
    {
      name: 'Company',
      links: [
        { label: 'About', url: '#' },
        { label: 'Careers', url: '#' },
        { label: 'Brand Center', url: '#' },
        { label: 'Blog', url: '#' },
      ],
    },
    {
      name: 'Help center',
      links: [
        { label: 'Discord Server', url: '#' },
        { label: 'Twitter', url: '#' },
        { label: 'Facebook', url: '#' },
        { label: 'Contact Us', url: '#' },
      ],
    },
    // Add more categories as needed
  ];
  const menuLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];
  const articles = [
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png',
      title: 'Our first office',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '2 minutes',
      url: '#',
    },
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png',
      title: 'Enterprise design tips',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '12 minutes',
      url: '#',
    },
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png',
      title: 'We partnered with Google',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '8 minutes',
      url: '#',
    },
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png',
      title: 'Our first project with React',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '4 minutes',
      url: '#',
    },
    // Add more articles here...
  ];

  const accordionItems = [
    {
      title: 'Ex orci laoreet egestas sapien magna egestas scelerisque?',
      content:
        'Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at adipiscing est.',
    },
    {
      title:
        'Lorem at arcu rutrum viverra metus sapien venenatis lobortis odio?',
      content:
        'Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti.',
    },
    {
      title:
        'Eleifend feugiat sollicitudin laoreet adipiscing bibendum suscipit erat?',
      content:
        'Justo libero tellus integer tincidunt justo semper consequat venenatis aliquet imperdiet. Ultricies urna proin fusce nulla pretium sodales vel magna et massa euismod vulputate sed.',
    },
  ];
  return (
    <>
      <Header menuLinks={menuLinks} />
      <Hero
        title="Terms and Conditions"
        breadcrumbTrail={breadcrumbTrail}
        subtitle="Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab
          amet vero eaque explicabo!"
      />

      <ContentSection>
        <header className="mb-4 lg:mb-6 not-format">
          <address className="flex items-center mb-6 not-italic">
            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                className="mr-4 w-16 h-16 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Jese Leos"
              />
              <div>
                <Link
                  href="#"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Jese Leos
                </Link>
                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                  Graphic Designer, educator & CEO Flowbite
                </p>
                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                  <time title="February 8th, 2022">Feb. 8, 2022</time>
                </p>
              </div>
            </div>
          </address>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            Best practices for successful prototypes
          </h1>
        </header>
        <p className="lead">
          Flowbite is an open-source library of UI components built with the
          utility-first classes from Tailwind CSS. It also includes interactive
          elements such as dropdowns, modals, datepickers.
        </p>
        <p>
          Before going digital, you might benefit from scribbling down some
          ideas in a sketchbook. This way, you can think things through before
          committing to an actual design project.
        </p>
        <p>
          But then I found a{' '}
          <a href="https://flowbite.com">
            component library based on Tailwind CSS called Flowbite
          </a>
          . It comes with the most commonly used UI components, such as buttons,
          navigation bars, cards, form elements, and more which are conveniently
          built with the utility classes from Tailwind CSS.
        </p>
        <figure>
          <img
            src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
            alt=""
          />
          <figcaption>Digital art by Anonymous</figcaption>
        </figure>
        <p>
          And there you have it! Everything you need to design and share
          prototypes — right in Flowbite Figma.
        </p>
      </ContentSection>

      <MoreArticles articles={articles} heading="Related articles" />
      <Newsletter
        heading="Sign up for our newsletter"
        description="Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email."
        buttonText="Subscribe to news"
      />

      <Footer categories={footerCategories} />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const categories = [] as any[]; // await
  return {
    props: {
      categories,
    },
  };
};
//Path: src/pages/terms/index.tsx
