import { Seo } from '@/components/seo';
import { ReactElement } from 'react';
import PublicLayout from '@/layouts/public-layout';
import Feature from '@/components/labs/LandingPage/Feature';
import Marquee from '@/components/labs/LandingPage/Marquee';
import Image from 'next/image';
export default function Home() {
  const marqueeItems = [
    {
      id: '1',
      title: 'Item 1',
      description: 'Description for Item 1',
    },
    {
      id: '2',
      title: 'Item 2',
      description: 'Description for Item 2',
    },
    {
      id: '3',
      title: 'Item 3',
      description: 'Description for Item 3',
    },
    {
      id: '4',
      title: 'Item 4',
      description: 'Description for Item 4',
    },
    {
      id: '5',
      title: 'Item 5',
      description: 'Description for Item 5',
    },
    {
      id: '6',
      title: 'Item 6',
      description: 'Description for Item 6',
    },
    {
      id: '7',
      title: 'Item 7',
      description: 'Description for Item 7',
    },
    {
      id: '8',
      title: 'Item 8',
      description: 'Description for Item 8',
    },
    {
      id: '9',
      title: 'Item 9',
      description: 'Description for Item 9',
    },
    {
      id: '10',
      title: 'Item 10',
      description: 'Description for Item 10',
    },
    {
      id: '11',
      title: 'Item 11',
      description: 'Description for Item 11',
    },
    {
      id: '12',
      title: 'Item 12',
      description: 'Description for Item 12',
    },
    {
      id: '13',
      title: 'Item 13',
      description: 'Description for Item 13',
    },
    {
      id: '14',
      title: 'Item 14',
      description: 'Description for Item 14',
    },
    {
      id: '15',
      title: 'Item 15',
      description: 'Description for Item 15',
    },
    {
      id: '16',
      title: 'Item 16',
      description: 'Description for Item 16',
    },
    {
      id: '17',
      title: 'Item 17',
      description: 'Description for Item 17',
    },
    {
      id: '18',
      title: 'Item 18',
      description: 'Description for Item 18',
    },
    {
      id: '19',
      title: 'Item 19',
      description: 'Description for Item 19',
    },
    {
      id: '20',
      title: 'Item 20',
      description: 'Description for Item 20',
    },
  ];
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
      <Feature />
      <Marquee play speed="slow">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-700 transform dark:bg-slate-900 rounded shadow-sm hover:scale-125 md:shadow-md hover:shadow-md`}
          >
            <Image
              src={item.media}
              alt={item.caption}
              width={500}
              height={500}
            />
            {item.caption}
          </div>
        ))}
      </Marquee>
      <Marquee items={marqueeItems} hoverToPause reverse play speed="slow" />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
