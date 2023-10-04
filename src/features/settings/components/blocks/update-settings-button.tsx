import { Button } from '@/components/button';
import React from 'react';

type UpdateSettingsButtonProps = {
  isLoading: boolean;
};

export const UpdateSettingsButton = ({
  isLoading,
}: UpdateSettingsButtonProps) => {
  return (
    <Button
      loading={!!isLoading}
      disabled={isLoading}
      nativeType="submit"
      size="large"
      type="primary"
    >
      Update settings
    </Button>
  );
};
