import { Button } from '@/components/button';
import { useLogin } from '../../api/login';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../types';
import { InputField } from '@/components';
export type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });
  const { register, handleSubmit, formState } = useForm<LoginData>();
  const onSubmit = (data: LoginData) => {
    console.log(data);
    login.submit(data);
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
      </Button></form>
    </div>
  );
};
