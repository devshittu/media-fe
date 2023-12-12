import Image from 'next/image';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
type OptionData = {
  id: string;
  title: string;
  description: string;
  slug: string;
};
const options: Option<OptionData>[] = [
  {
    id: '1',
    title: 'Option 1',
    description: 'Description for Option 1',
    slug: 'option-1',
    label: 'Option 1 Label',
  },
  {
    id: '2',
    title: 'Option 2',
    description: 'Description for Option 2',
    slug: 'option-2',
    label: 'Option 2 Label',
  },
  // Add more options as needed
];
const initialOptions: Option<OptionData>[] = [
  {
    id: '1',
    title: 'Option 1',
    description: 'Description for Option 1',
    slug: 'option-1',
    label: 'Option 1 Label',
  },
  {
    id: '2',
    title: 'Option 2',
    description: 'Description for Option 2',
    slug: 'option-2',
    label: 'Option 1 Label',
  },
  // Add more options as needed
];
// Step1.tsx
export const Step1: React.FC = () => {
  const handleCustomCheckboxGroupChange = (
    selectedOptions: Option<OptionData>[],
  ) => {
    // Handle the change of selected options here
    // e.g., update the state or perform other actions
    console.table(selectedOptions);
  };

  const renderOptionData = (option: OptionData) => (
    <div>
      <div>ID: {option.id}</div>
      <div>Title: {option.title}</div>
      <div>Description: {option.description}</div>
      <div>Slug: {option.slug}</div>
    </div>
  );

  return (
    <div>
      <h3 className="mb-5 text-lg font-medium text-slate-900 dark:text-white">
        Choose technologies:
      </h3>

      <CustomCheckboxGroup<OptionData, OptionData>
        initialSelectedOptions={initialOptions}
        options={options}
        onChange={handleCustomCheckboxGroupChange}
        renderDisplayComponent={renderOptionData}
      />
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
      <ul className="max-w-sm divide-y divide-slate-200 dark:divide-slate-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image
                width="48"
                height="48"
                className="rounded-md w-14 h-14"
                alt="Avatar image"
                loading="lazy"
                src={`https://xsgames.co/randomusers/avatar.php?g=male`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-slate-500 truncate dark:text-slate-400">
                email@example.com
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
                loading="lazy"
                src={`https://xsgames.co/randomusers/avatar.php?g=female`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p className="text-sm text-slate-500 truncate dark:text-slate-400">
                email@example.com
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

// Step8.tsx
export const Step7: React.FC = () => {
  return (
    <div>
      Step 7: Load to the home pageShow them around using the tour feature in
      the app
    </div>
  );
};

const step8Config = {
  isMandatory: false,
};

const steps = [
  {
    id: 'step1',
    title: 'Categories of your choice',
    subtitle:
      'Lets customize your experience by making choice of your favorite categories',
    component: <Step1 />,
    ...step1Config,
  },
  {
    id: 'step2',
    title: 'Email Confirmation',
    subtitle: 'Confirm your email using the token sent to your account',
    component: <Step2 />,
    ...step2Config,
  },
  {
    id: 'step3',
    title: 'Hi Full Name',
    subtitle: 'You are welcome to the world of endless opportunities',
    component: <Step3 />,
    ...step3Config,
  },
  {
    id: 'step4',
    title: 'Categories of your choice',
    subtitle:
      'Lets customize your experience by making choice of your favorite categories',
    component: <Step4 />,
    ...step4Config,
  },
  {
    id: 'step5',
    title: 'Follow some of your favorite channels',
    subtitle: 'Set favorite channels to follow',
    component: <Step5 />,
    ...step5Config,
  },
  {
    id: 'step6',
    title: 'Theme',
    subtitle: ' Choose the visual theme for the interface',
    component: <Step6 />,
    ...step6Config,
  },

  {
    id: 'step7',
    title: 'Take a tour',
    subtitle: 'Lets show you around',
    component: <Step7 />,
    ...step8Config,
  },
];

export default steps;
