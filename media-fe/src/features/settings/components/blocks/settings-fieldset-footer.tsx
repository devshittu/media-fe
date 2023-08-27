import React from 'react';
interface SettingsFieldsetFooterProps {
  id?: string;
  children: React.ReactNode;
}

export const SettingsFieldsetFooter = ({
  id,
  children,
}: SettingsFieldsetFooterProps) => {
  return (
    <div className="flex items-center justify-between flex-row-reverse p-8">
      {children}
    </div>
  );
};

// Path src/features/settings/components/blocks/settings-field.tsx
