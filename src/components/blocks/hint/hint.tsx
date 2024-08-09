'use client';
import React, { useEffect } from 'react';
import { useToggle } from '@/hooks';
import { Badge, BadgeSize, BadgeType } from '@/components/blocks/badge';
import { InfoIcon } from '@/components/illustrations';
type HintProps = {
  description: string;
  notes?: string;
};
export const Hint = ({ description, notes }: HintProps) => {
  const { isVisible, toggleVisibility } = useToggle();
  const handleClick = () => {
    toggleVisibility();
  };

  return (
    <>
      <Badge
        id="show-hint-token"
        type={BadgeType.INFO}
        size={BadgeSize.LARGE}
        onClick={handleClick}
        rounded
        icon={<InfoIcon className="w-4 h-4 stroke-[3]" />}
      >
        <h2 className="font-bold text-base">Hint</h2>
      </Badge>
      <div
        className={`hint ${
          isVisible ? 'block' : 'hidden'
        } bg-sky-200 dark:bg-sky-800 p-2 rounded-sm mt-3`}
      >
        <p>{description}</p>
        {notes && (
          <p>
            <strong>Note:</strong> {notes}
          </p>
        )}
      </div>
    </>
  );
};
