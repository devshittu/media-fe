import { Button } from '@/components/button';
import { useLogin } from '../../api/login';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../types';
import { InputField } from '@/components';
import { useRouter } from 'next/router';
import {
  ControlledPopper,
  UncontrolledPopper,
} from '@/components/blocks/popup';
import { SignupFlowSteps } from '../signup-flow';
import Wizard from '@/components/blocks/wizard/wizard';
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
      <ControlledPopper>
        <Wizard steps={SignupFlowSteps} onFinish={handleFinish} />
      </ControlledPopper>
      {/* <UncontrolledPopper>
        <Wizard steps={SignupFlowSteps} onFinish={handleFinish} />
      </UncontrolledPopper> */}
    </div>
  );
};
