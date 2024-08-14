// bannerElement.tsx
'use client';
import React from 'react';
import { Banner, BannerType } from '@/components/blocks/banner';

export const DevelopmentBanner = (
  <Banner
    link="/questionnaire"
    text="This product is currently in the development stage. We invite you to give your honest review to help us improve."
    dismissible={true}
    type={BannerType.INFO}
  />
);
