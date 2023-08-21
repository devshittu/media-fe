import { Button } from '@/components/button';
import { useLogin } from '../../api/login';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../types';
import { InputField } from '@/components';
import {
  ControlledPopup,
  Dialog,
  DialogFlow,
  DialogSampleUsage,
  UncontrolledPopup,
  // PopupDialog,
} from '../../../../components/blocks/dialog/dialog-components';
import { useRouter } from 'next/router';

import steps from '@/components/blocks/wizard/steps';
export type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });
  const { register, handleSubmit, formState } = useForm<LoginData>({
    defaultValues: { email: 'user1@test.com' },
  });
  const onSubmit = (data: LoginData) => {
    console.log(data);
    login.submit(data);
  };

  const router = useRouter();
  const handleFinish = () => {
    // Handle logic when the user finishes the wizard
    console.log('Wizard finished!');

    // goto the landing page
    router.push('/stories');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="Email"
          type="email"
          {...register('email', { required: 'Required' })}
          error={formState.errors['email']}
        />
        <InputField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Required',
          })}
          error={formState.errors['password']}
        />
        <Button
          loading={!!login.isLoading}
          disabled={login.isLoading}
          nativeType="submit"
        >
          Log in
        </Button>
      </form>
      <ControlledPopup>
        <DialogFlow steps={steps} onFinish={handleFinish} />
      </ControlledPopup>
      <UncontrolledPopup>
        <DialogFlow steps={steps} onFinish={handleFinish} />
      </UncontrolledPopup>
    </div>
  );
};
