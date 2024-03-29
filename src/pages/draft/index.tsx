import React, { ReactElement } from 'react';
// import styles from '@/styles/draft.module.css';
import { Link } from '@/components/labs/typography';
import { NavMain } from '@/components/blocks/nav';
import UserLayout from '@/layouts/user-layout';

const Index = () => {
  return (
    <div className={`relative container grid grid-cols-10 max-w-7xl mx-auto`}>
      {/* <article className={styles.draft_main}> */}
      <article className={`col-span-8 border-rx`}>
        <div className="p-4 sm:ml-64x">
          <div className="p-4 border-2 border-slate-200 border-dashed rounded-lg dark:border-slate-700">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-slate-50 dark:bg-slate-800">
              <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-slate-50 dark:bg-slate-800">
              <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-slate-50 h-28 dark:bg-slate-800">
                <p className="text-2xl text-slate-400 dark:text-slate-500">+</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
export default Index;
