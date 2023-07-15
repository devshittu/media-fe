import TokenPinInputField, {
  UserLoginStatus,
} from '@/components/form/token-pin-digit';
import WizardStep from './wizard-step';
import Image from 'next/image';
import {LayoutCheckbox} from '@/components/form/layout-checkbox';
import { useState } from 'react';

// Step1.tsx
export const Step1: React.FC = () => {
 const [checkboxStates, setCheckboxStates] = useState({
    react: false,
    vue: false,
    angular: false,
  });

  const handleCheckboxChange = (checkboxId: string, isChecked: boolean) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [checkboxId]: isChecked,
    }));
  };
  return (
    <div>
      {/* Step 1: Signup with only email (a token will be sent to your email) */}

    <div>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Choose technology:
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        <LayoutCheckbox
          id="react-option"
          label="React Js"
          description="A JavaScript library for building user interfaces."
          isChecked={checkboxStates.react}
          onChange={(isChecked) => handleCheckboxChange('react', isChecked)}
        />
        <LayoutCheckbox
          id="flowbite-option"
          label="Vue Js"
          description="Vue.js is a model–view front end JavaScript framework."
          isChecked={checkboxStates.vue}
          onChange={(isChecked) => handleCheckboxChange('vue', isChecked)}
        />
        <LayoutCheckbox
          id="angular-option"
          label="Angular"
          description="A TypeScript-based web application framework."
          isChecked={checkboxStates.angular}
          onChange={(isChecked) => handleCheckboxChange('angular', isChecked)}
        />
      </ul>
    </div>
 </div>
  );
};

const step1Config = {
  isMandatory: true,
};

// Step2.tsx
export const Step2: React.FC = () => {
  return <div>Step 2: Enter token</div>;
};

const step2Config = {
  isMandatory: true,
};

// Step3.tsx
export const Step3: React.FC = () => {
  return <div>Step 3: Welcome message</div>;
};

const step3Config = {
  isMandatory: true,
};

// Step4.tsx
export const Step4: React.FC = () => {
  return <div>Step 4: Set favorite categories (skippable)</div>;
};

const step4Config = {
  isMandatory: false,
};

// Step5.tsx
export const Step5: React.FC = () => {
  return (
    <div>
      Step 5: Set favorite channels to follow (skippable)
      <ul
        className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
      >
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
          <Image
            width="48"
            height="48"
            className="rounded-md w-14 h-14"
            alt="Avatar image"
            loading="lazy"  src={`https://xsgames.co/randomusers/avatar.php?g=male`}/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              Available
            </span>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
          <Image
            width="48"
            height="48"
            className="rounded-md w-14 h-14"
            alt="Avatar image"
            loading="lazy"  src={`https://xsgames.co/randomusers/avatar.php?g=female`}/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
              Unavailable
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
const step5Config = {
  isMandatory: false,
};

// Step6.tsx
export const Step6: React.FC = () => {
  return (
    <div>
      Step 6: Set favorite theme color (light, dark, or system preferences)
    </div>
  );
};

const step6Config = {
  isMandatory: true,
};

// Step7.tsx
export const Step7: React.FC = () => {
  return <div>Step 7: Take them to the home page</div>;
};

const step7Config = {
  isMandatory: true,
};

// Step8.tsx
export const Step8: React.FC = () => {
  return <div>Step 8: Show them around using the tour feature in the app</div>;
};

const step8Config = {
  isMandatory: false,
};

const steps = [
  { id: 'step1', component: <Step1 />, ...step1Config },
  {
    id: 'step2',
    component: (
      <TokenPinInputField
        id="token"
        pinLength={4}
        userLoginStatus={UserLoginStatus.LOGGED_OUT}
      />
    ),
    ...step2Config,
  },
  { id: 'step3', component: <Step3 />, ...step3Config },
  { id: 'step4', component: <Step4 />, ...step4Config },
  { id: 'step5', component: <Step5 />, ...step5Config },
  { id: 'step6', component: <Step6 />, ...step6Config },
  { id: 'step7', component: <Step7 />, ...step7Config },
  { id: 'step8', component: <Step8 />, ...step8Config },
];

export default steps;
