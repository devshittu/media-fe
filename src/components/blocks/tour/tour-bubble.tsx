import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../card';
import TourPopper from './tour-popper';
// import { TourCard } from './tour-card';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon,
  InfoIcon,
  XIcon,
} from '@/components/illustrations';
import { Button } from '@/components/button';

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
      >
        <Card
          heading="My Card"
          description="This is a reusable card component."
          className="!bg-amber-300  shadow-2xl"
        >
          <CardHeader className=" text-slate-900 dark:text-amber-950">
            <Icon
              icon={<InfoIcon />}
              strokeWidth={3}
              className="w-7 h-7  text-slate-900 dark:text-amber-950 mb-3 justify-start items-start"
            />
            <Button
              className="self-start text-amber-600 text-base hover:underline"
              onClick={props.onClose}
            >
              Skip
            </Button>
          </CardHeader>

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-amber-950">
            Guide?
          </h5>
          <CardBody>
            <div className=" text-slate-800 dark:text-amber-800">
              {props.content}
            </div>
          </CardBody>
          <CardFooter>
            {props.previousLabel ? (
              <Button
                icon={<ChevronLeftIcon />}
                className="inline-flex items-center text-blue-600 hover:underline"
                onClick={props.onPrevious}
              >
                {/* <Icon icon={<ChevronLeftIcon />} className="w-6 h-6 mr-2.5" /> */}
                {props.previousLabel}
              </Button>
            ) : (
              <div>&nbsp;</div>
            )}

            {props.nextLabel ? (
              <Button
                iconPosition="right"
                icon={<ChevronRightIcon />}
                className="inline-flex items-center text-blue-600 hover:underline"
                onClick={props.onNext}
              >
                {props.nextLabel}
                {/* <Icon icon={<ChevronRightIcon />} className="w-6 h-6 ml-2.5" /> */}
              </Button>
            ) : (
              <div>&nbsp;</div>
            )}
          </CardFooter>
        </Card>
      </TourPopper>
    </>
  ) : null;
};

export default TourBubble;
