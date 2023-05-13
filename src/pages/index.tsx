import Head from 'next/head';
// import Image from 'next/image'
// import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import { Seo } from '@/components/seo';
import { Button } from '@/components/button';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const mailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-mail"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
  return (
    <>
      <Seo title="New App" />
      <main>
        <h1>Hello Media</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button
          type="info"
          size="small"
          outlined
          badge="New"
          icon={mailIcon}
          loading
        >
          Newon
        </Button>

        <Button type="success" outlined badge="New">
          Newon
        </Button>
        <Button type="warning" size="large" outlined badge="New">
          Newon
        </Button>
        <Button type="primary" outlined icon={mailIcon}>
          Hello world!
        </Button>
        <Button
          type="danger"
          size="large"
          icon={mailIcon}
          iconPosition="right"
          outlined
          className=" text-2xl "
        >
          Newon
        </Button>
        <Button
          type="info"
          size="large"
          loading
          className=" text-2xl inline-flex"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          Loading...
        </Button>
        <h1 className="text-3xl font-bold underline bg-secondary">
          Hello world!
        </h1>
      </main>
    </>
  );
}
