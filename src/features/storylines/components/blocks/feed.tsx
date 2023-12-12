import React from 'react';

type ProfileImageProps = {
  src: string;
  alt: string;
};

// const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => (
//   <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-slate-900 dark:bg-blue-900">
//     <img className="rounded-full shadow-lg" src={src} alt={alt} />
//   </span>
// );

type ProfileItemProps = {
  image?: ProfileImageProps;
  time?: string;
  mainContent?: React.ReactNode;
  additionalContent?: React.ReactNode;
};

const ProfileItem: React.FC<ProfileItemProps> = ({
  image,
  time,
  mainContent,
  additionalContent,
}) => (
  <li className="mb-10 ml-6">
    {/* <ProfileImage {...image} /> */}
    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm dark:bg-slate-700 dark:border-slate-600">
      <div className="items-center justify-between mb-3 sm:flex">
        <time className="mb-1 text-xs font-normal text-slate-400 sm:order-last sm:mb-0">
          {time}
        </time>
        <div className="text-sm font-normal text-slate-500 lex dark:text-slate-300">
          {mainContent}
        </div>
      </div>
      {additionalContent && (
        <div className="p-3 text-xs italic font-normal text-slate-500 border border-slate-200 rounded-lg bg-slate-50 dark:bg-slate-600 dark:border-slate-500 dark:text-slate-300">
          {additionalContent}
        </div>
      )}
    </div>
  </li>
);

type ActivityFeedProps = {
  items: ProfileItemProps[];
};

const ActivityFeed = ({ items }: ActivityFeedProps) => (
  <ol className="relative border-l border-slate-200 dark:border-slate-700">
    {items.map((item, idx) => (
      <ProfileItem key={idx} {...item} />
    ))}
  </ol>
);

export default ActivityFeed;
