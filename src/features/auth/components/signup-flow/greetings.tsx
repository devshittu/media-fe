import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { useWizardContext } from '@/components/blocks/wizard/wizard-context';
import { Button } from '@/components/button';
import Image from 'next/image';
import React, { useEffect } from 'react';

export const Greetings = () => {
  // No validation function passed, so it assumes isValid is true
  useWizardStepValidation();

  const { goToNextStep } = useWizardContext();
console.log('goToNextStep',goToNextStep);

  return (
    <div className="w-full max-w-6xl p-0 lg:p-2 mx-auto relative md:text-left">
      <div className="md:flex items-center -mx-10x">
        <div className="w-full md:w-1/2 px-10x mb-10 md:mb-0">
          <div className="relative">
            <Image
              width="600"
              height="600"
              className="rounded-md w-80 h-80 shadow-xl w-fullx relative z-10"
              src={`https://dummyimage.com/320x320`}
              alt="Avatar image"
              loading="lazy"
            />
            {/* <img src="https://pngimg.com/uploads/raincoat/raincoat_PNG53.png" className="w-full relative z-10" alt="" /> */}
            <div className="border-4 border-slate-800 dark:border-slate-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:px-10">
          <div className="mb-10 flex flex-col md:space-y-4 ">
            {/* <h1 className="font-bold uppercase text-2xl mb-5">Mens Ragged <br />Waterproof Jacket</h1> */}
            <p className="text-base md:text-lg">
              {`Embark on a personalized news journey with Media-Fe's Timelines.
              Track subjects over time, bookmark updates, and stay connected to
              the stories that matter most to you. 
              `}
            </p>
            <p className="text-base md:text-lg">
              Your news, your way, starts now!
            </p>
          </div>
          <div>
            <div className="inline-block align-bottom">
              <Button className="font-bold" type={'adaptive'} outlined>
                DISCOVER MORE
              </Button>
      <Button onClick={goToNextStep}  type={'adaptive'}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Path: src/features/auth/components/signup-flow/greetings.tsx
