import { Button } from '@/components/button';
import { SettingsFieldsetFooter } from './settings-fieldset-footer';

type FooterProps = {
  isLoading: boolean;
};

export const SettingsFooter = ({ isLoading }: FooterProps) => (
  <SettingsFieldsetFooter>
    <Button
      id={`update-settings`}
      loading={!!isLoading}
      disabled={isLoading}
      nativeType="submit"
      size="large"
      type="primary"
    >
      Update settings
    </Button>
  </SettingsFieldsetFooter>
);
