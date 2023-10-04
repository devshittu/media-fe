import { Hashtag, HashtagListItem } from '@/features/hashtags';
import { Storyline } from '../../types';
import React from 'react';

export type StorylinePaneProps = {
  storyline: Storyline;
  hashtags: Hashtag[];
};

type SectionProps = {
  title: string;
  children: React.ReactNode; // This line explicitly types the children prop
};

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-4 font-normal text-slate-700 dark:text-slate-400">
    <h5 className="mb-2 font-bold tracking-tight text-slate-900 dark:text-white">
      {title}:
    </h5>
    <div>{children}</div>
  </div>
);

export const StorylinePane = ({ storyline, hashtags }: StorylinePaneProps) => {
  return (
    <div className="max-w-sm">
      {/* TODO: <Section title="Topics">
        <div className="flex gap-4 flex-wrap text-inherit">{storyline.summary}</div>
      </Section> */}
      <Section title="Summary">
        <p>{storyline.summary}</p>
      </Section>
      <Section title="Description">
        <p>{storyline.description}</p>
      </Section>
      <Section title="Subjects">
        <p>{storyline.subject}</p>
      </Section>
      <Section title="Hashtags">
        {hashtags?.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {hashtags.map((hashtag: Hashtag, i) => (
              <HashtagListItem key={i} hashtag={hashtag} />
            ))}
          </div>
        ) : (
          <>
            <p>No hashtag found</p>
          </>
        )}
      </Section>
    </div>
  );
};

// src/features/storylines/components/sidepanel/storyline-pane.tsx

const DefaultArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 5h12m0 0L9 1m4 4L9 9"
    />
  </svg>
);
