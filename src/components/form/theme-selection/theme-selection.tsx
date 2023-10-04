import React, { useState } from 'react';

export type ThemeOption = {
  id: string;
  label: string;
  description: string;
  svg: JSX.Element;
};

type ThemeSelectionProps = {
  options: ThemeOption[];
  selectedTheme?: string; // Add this line for the selected theme
  errorMessage?: string | null; // Add this line for the error message
  onSelect?: (selectedOption: ThemeOption) => void;
};

export const ThemeSelection: React.FC<ThemeSelectionProps> = ({
  options,
  onSelect,
  selectedTheme,
  errorMessage,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedTheme || null,
  );

  const handleSelection = (option: ThemeOption) => {
    setSelectedOption(option.id);
    onSelect?.(option);
  };

  return (
    <div className="font-sansx">
      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <ul className="grid w-full gap-6 md:grid-cols-4">
        {options.map((option) => (
          <li key={option.id}>
            <input
              type="radio"
              id={option.id}
              value={option.id}
              className="hidden peer"
              name="theme"
              checked={selectedOption === option.id}
              onChange={() => handleSelection(option)}
            />
            <label
              htmlFor={option.id}
              className="inline-flex items-center justify-between w-full p-5 bg-white border-2 border-slate-200 rounded-lg cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 peer-checked:border-cyan-600 hover:text-slate-600 dark:peer-checked:text-slate-300 peer-checked:text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <div className="block">
                {option.svg}
                <h3 className="w-full text-lg font-semibold tracking-wide">
                  {option.label}
                </h3>
                <div className="w-full text-sm">{option.description}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelection;
