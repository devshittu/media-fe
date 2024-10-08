// import React from 'react';
// import { useRouter } from 'next/router';
// import { ArrowRightIcon, HomeIcon, Icon } from '@/components/illustrations';
// import { Link } from '@/components/labs';

// export type BreadcrumbTrail = {
//   href: string;
//   label: string;
// };
// type BreadcrumbProps = {
//   trails?: BreadcrumbTrail[];
// };

// const Breadcrumb: React.FC<BreadcrumbProps> = ({ trails }) => {
//   const router = useRouter();
//   const { asPath, pathname } = router;

//   // Use the provided trail prop or generate the trail links based on the current path
//   const linkTrail = trails || pathname.split('/').filter((path) => path !== '');

//   return (
//     <nav
//       aria-label="breadcrumb"
//       className="w-full text-slate-600 dark:text-slate-500"
//     >
//       <ol className="flex h-8 space-x-2">
//         <li className="flex items-center">
//           <Link href="/" title="Back to homepage" className="hover:underline">
//             <HomeIcon
//               className="w-5 h-5 pr-1 dark:text-slate-300"
//               strokeWidth={3}
//             />
//           </Link>
//         </li>

//         {trails?.map((item, index) => (
//           <li key={index} className="flex items-center space-x-2">
//             <Icon
//               icon={<ArrowRightIcon />}
//               strokeWidth={3}
//               className="w-4 h-4 mt-0.5"
//             />
//             <Link
//               href={item.href}
//               className={`flex items-center px-1 capitalize ${
//                 asPath === item.href
//                   ? 'hover:no-underline cursor-default'
//                   : 'hover:underline'
//               }`}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}

//         {/* {linkTrail.map((link, index) => (
//           <li key={index} className="flex items-center space-x-2">
//             <Icon
//               icon={<ArrowRightIcon />}
//               className="w-4 h-4  mt-0.5 fill-current dark:text-slate-600"
//             />
//             <Link href={link.link} className="flex items-center px-1 capitalize hover:underline">
//               {link.label}
//             </Link>
//           </li>
//         ))}

//         <li className="flex items-center space-x-2">
//           <Icon
//             icon={<ArrowRightIcon />}
//             className="w-4 h-4 mt-0.5 fill-current dark:text-slate-600"
//           />
//           <Link
//             href="#"
//             className="flex items-center px-1 capitalize hover:underline hover:no-underline cursor-default"
//           >
//             Current
//           </Link>
//         </li> */}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumb;

// // Path: src/components/blocks/breadcrumb/breadcrumb.tsx
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon, HomeIcon } from '@/components/illustrations';
import { Link } from '@/components/labs';

export type BreadcrumbTrail = {
  href: string;
  label: string;
};

type BreadcrumbProps = {
  trails?: BreadcrumbTrail[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ trails }) => {
  const pathname = usePathname();

  // Automatically generate breadcrumb trail if not provided
  const autoTrail =
    trails ||
    (pathname
      ? pathname
          .split('/')
          .filter((path) => path)
          .map((path, index, arr) => {
            // Transform the path segment into a user-friendly label
            const label = path
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (l) => l.toUpperCase());
            // Construct the href for each breadcrumb segment
            const href = '/' + arr.slice(0, index + 1).join('/');
            return { label, href };
          })
      : []);

  return (
    <nav
      aria-label="breadcrumb"
      className="w-full text-slate-600 dark:text-slate-500"
    >
      <ol className="flex h-8 space-x-2">
        <li className="flex items-center">
          <Link href="/" title="Back to homepage" className="hover:underline">
            <HomeIcon
              className="w-5 h-5 pr-1 dark:text-slate-300"
              strokeWidth={3}
            />
          </Link>
        </li>
        {autoTrail.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ArrowRightIcon className="w-4 h-4 mt-0.5" />
            <Link
              href={item.href}
              className={`flex items-center px-1 capitalize ${
                pathname === item.href
                  ? 'hover:no-underline cursor-default'
                  : 'hover:underline'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

// Path: src/components/blocks/breadcrumb/breadcrumb.tsx
