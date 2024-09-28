'use client';
import React from 'react';
import { Banner, BannerType } from '@/components/blocks/banner';
import { Link } from '@/components/labs';
import { ArrowRightIcon } from '@/components/illustrations';
import { Tag } from '../tag';
import { Button } from '@/components/button';
import { AttentionType } from '@/types';
import { PromptPopup } from '@/components/blocks/popup/blocks/';
import { usePopupStore } from '@/stores/ui';




export const DevelopmentBannerComponent = () => {
  const {
    show: showPopup,
    isOpen,
    isClosing: popupIsClosing,
    close: closePopup,
  } = usePopupStore();
  const handleStartTesterSurvey = (): void => {
    showPopup(
      <PromptPopup
        type={AttentionType.INFO}
        onOk={closePopup}
        onClose={closePopup}
        isOpen={isOpen}
        isClosing={popupIsClosing}
        duration={0}
        title={'Feature Coming Soon!'}
        message={`Stay tuned—it's in the works and will be available soon! We appreciate your patience and look forward to your feedback once it's live.`}
      />,
    );
  }

  return (
    <Banner
      dismissible={true}
      type={BannerType.INFO}
    >
      <>
          <span className="mr-2">
            <Tag variant="yellow">
              <strong>Beta</strong>
            </Tag>
          </span>
      <span>This product is currently in the development stage. We invite you to give your honest review to help us improve.</span>      
      
          <Button
            id={`trigger-tester-survey`}
            onClick={handleStartTesterSurvey}
            className="ml-2 font-source-serif-pro inline-flex items-center font-medium hover:underline"
          >
        Check it out
        <ArrowRightIcon className="w-3 h-3 ml-1.5" strokeWidth={3} /></Button>
      {/* <Link
        className="inline-flex items-center ml-2 font-medium hover:underline"
        href="/questionnaire"
      >
        Check it out
        <ArrowRightIcon className="w-3 h-3 ml-1.5" strokeWidth={3} />
      </Link> */}
      </>
    </Banner>
  );
};

export const DevelopmentBanner = (
  <DevelopmentBannerComponent />
);

// Path: src/components/blocks/banner/development-banner.tsx