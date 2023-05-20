import React from 'react';
import styles from '@/styles/draft.module.css';
import feedsStyles from '@/styles/feeds.module.css';
import { MainNav } from '@/components/widgets/main-nav';
import { StoryItem, StoryItem2 } from '@/components/widgets/stories';
import { SidePanel } from '@/components/widgets/side-panel';

const Feeds = () => {
  return (
    <div className={styles.draft_container}>
      

      <MainNav />
      <main className={styles.draft_main}>
        <div className={feedsStyles.feed_layout}>
          <div className={feedsStyles.feeds_stream}>
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            {/* <StoryItem2 /> */}
          </div>
          <div className={feedsStyles.feeds_sidenav}>
            <SidePanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feeds;
