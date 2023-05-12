import Head from 'next/head';
// import Image from 'next/image'
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Seo } from '@/components/seo';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Seo title="New App" />
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Hello Media</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}
