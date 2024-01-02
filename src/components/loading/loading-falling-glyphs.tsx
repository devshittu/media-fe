import React from 'react';
import {
  BarChart2Icon,
  BookmarkIcon,
  CastIcon,
  CloudDrizzleIcon,
  DribbbleIcon,
  GlobeIcon,
  Icon,
  TrendingUpIcon,
  UserIcon,
  WhatsappColoredIcon,
} from '../illustrations';

export const LoadingFallingGlyph: React.FC = () => {
  const size1 = ' w-8 ';
  const size2 = ' w-16 ';
  const size3 = ' w-20 ';
  const size4 = ' w-12 ';
  const size5 = ' w-16 ';
  const size6 = ' w-8 ';
  const size7 = ' w-12 ';
  const size8 = ' w-8 ';

  const animation1 = ' animate-flake1 ';
  const animation2 = ' animate-flake2 ';
  const animation3 = ' animate-flake3 ';
  const animation4 = ' animate-flake4 ';
  const animation5 = ' animate-flake5 ';
  const animation6 = ' animate-flake6 ';
  const animation7 = ' animate-flake7 ';
  const animation8 = ' animate-flake8 ';

  return (
    <div className="bg-[#1D9F75] text-slate-700 dark:text-slate-100 ">
      {'Glyphs'}
      <section id="flake">
        <div className={`w-[400px] block m-auto h-96 `}>
          <SpanInlineBlock animation={animation1} size={size1}>
            <TrendingUpIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation2} size={size2}>
            <CastIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation3} size={size3}>
            <CloudDrizzleIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation4} size={size4}>
            <DribbbleIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation5} size={size5}>
            <UserIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation6} size={size6}>
            <BookmarkIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation7} size={size7}>
            <GlobeIcon />
          </SpanInlineBlock>

          <SpanInlineBlock animation={animation8} size={size8}>
            <BarChart2Icon />
          </SpanInlineBlock>
          {/* Add more icons as needed */}
        </div>
      </section>
    </div>
  );
};

const SpanInlineBlock = ({
  children,
  size,
  animation,
}: {
  children: React.ReactNode;
  size: string;
  animation: string;
}) => {
  return (
    <span className={`${animation} inline-block ${size} m-4`}>{children}</span>
  );
};
