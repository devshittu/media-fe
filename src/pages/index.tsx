import { Seo } from '@/components/seo';
import React, { ReactElement } from 'react';
import PublicLayout from '@/layouts/public-layout';
import {
  Feature,
  Hero,
  Marquee,
  Footer,
  Nav,
} from '@/components/labs/LandingPage/';
import Image from 'next/image';
import Link from 'next/link';
import { getCategories } from '@/testing/test-data';
import { StoryItem } from '@/components/blocks/stories';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

type PublicHomePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function Home({ categories }: PublicHomePageProps) {
  const carouselItems = [
    {
      id: '1',
      media:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=20',
      caption: '1 ',
    },
    {
      id: '2',
      media:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=20',
      caption: '2 ',
    },
  ];
  return (
    <>
      <Seo title="New App" />
      <Nav />
      <Hero />
      <Feature />
      <Marquee play speed="slow" hoverToPause>
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {carouselItems.map((item, index) => (
              <Link key={index} href="/" aria-label="View Item">
                <div className="relative overflow-hidden transition duration-75 transform rounded shadow-lg hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
                  <Image
                    src={item.media}
                    alt={item.caption}
                    width={500}
                    height={500}
                    className="object-cover w-full h-56 md:h-64 xl:h-80"
                  />
                  <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
                    <p className="text-sm font-medium tracking-wide text-white">
                      {item.caption}{' '}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </Marquee>
      <Marquee items={categories} hoverToPause reverse play speed="slow">
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {carouselItems.map((item, index) => (
              <Link key={index} href="/" aria-label="View Item">
                <div className="relative overflow-hidden transition duration-75 transform rounded shadow-lg hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
                  <Image
                    src={item.media}
                    alt={item.caption}
                    width={500}
                    height={500}
                    className="object-cover w-full h-56 md:h-64 xl:h-80"
                  />
                  <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
                    <p className="text-sm font-medium tracking-wide text-white">
                      {item.caption}{' '}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </Marquee>
      <Footer />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const categories = await getCategories().catch(() => [] as StoryItem[]);
  return {
    props: {
      // stories,
      categories,
    },
  };
};
