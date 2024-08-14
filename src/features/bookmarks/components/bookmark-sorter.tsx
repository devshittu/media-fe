'use client';
import {
  AnalogSwitch,
  AnalogSwitchItem,
  AnalogSwitchOption,
} from '@/components';
import React, { useState } from 'react';

const SORT_DATE_ADDED = 'dateAdded';
const SORT_STORY_DATE = 'storyDate';
const SORT_TITLE = 'title';

type BookmarkSorterProps = {
  selectedValue?: string;
  onSelect: (value: string) => void;
  className?: string;
};

export const BookmarkSorter = ({
  selectedValue,
  onSelect,
  className,
}: BookmarkSorterProps) => {
  return (
    <AnalogSwitch className={className}>
      <AnalogSwitchOption
        title="Date Added"
        value={SORT_DATE_ADDED}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
      <AnalogSwitchOption
        title="Story Date"
        value={SORT_STORY_DATE}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
      <AnalogSwitchOption
        title="Title"
        value={SORT_TITLE}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    </AnalogSwitch>
  );
};

export default BookmarkSorter;
