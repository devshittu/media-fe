import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../card';
import TourPopper, { TourPopperType } from './tour-popper';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon,
  InfoIcon,
  XIcon,
} from '@/components/illustrations';
import { Button } from '@/components/button';
import { Space } from '@/components/labs';

type TourBubbleProps = {
  forElement?: string;
  open: boolean;
  placement?: string;
  onClose: () => void;
  previousLabel?: string;
  nextLabel?: string;
  onPrevious: () => void;
  onNext: () => void;
  content: React.ReactNode;
  type?: TourPopperType;
};

const TourBubble: React.FC<TourBubbleProps> = (props) => {
  const element = props.forElement
    ? (document.querySelector(props.forElement) as HTMLElement)
    : null;
  return element ? (
    <>
      <TourPopper
        strategy="fixed"
        placement="bottom-start"
        refElement={props.forElement}
        portaled
        isOpen={props.open}
        onClose={props.onClose}
        type={props.type}
      >
        <Card
          heading="My Card"
          description="This is a reusable card component."
          className="!bg-transparent shadow-2xl "
        >
          <CardHeader className=" text-slate-900 dark:text-amber-950">
            <Icon
              icon={<InfoIcon />}
              strokeWidth={3}
              className="w-7 h-7  text-slate-900 dark:text-slate-950 mb-3 justify-start items-start"
            />
            <Button
              id={`action-close`}
              className="self-start text-black text-base hover:underline"
              onClick={props.onClose}
            >
              Skip
            </Button>
          </CardHeader>

          <h5 className="mb-2 text-base md:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-950">
            Guide?
          </h5>
          <CardBody>
            <div className=" text-slate-800 dark:text-slate-950">
              {props.content}
            </div>
          </CardBody>
          <CardFooter>
            {props.previousLabel ? (
              <Button
                id={`action-previous`}
                icon={<ChevronLeftIcon />}
                className="inline-flex items-center text-blue-600 hover:underline"
                onClick={props.onPrevious}
              >
                {props.previousLabel}
              </Button>
            ) : (
              <div>
                <Space />
              </div>
            )}

            {props.nextLabel ? (
              <Button
                id={`action-next`}
                iconPosition="right"
                icon={<ChevronRightIcon />}
                className="inline-flex items-center text-blue-600 hover:underline"
                onClick={props.onNext}
              >
                {props.nextLabel}
              </Button>
            ) : (
              <div>
                <Space />
              </div>
            )}
          </CardFooter>
        </Card>
      </TourPopper>
    </>
  ) : null;
};

export default TourBubble;

//Path: src/components/blocks/tour/tour-bubble.tsx
