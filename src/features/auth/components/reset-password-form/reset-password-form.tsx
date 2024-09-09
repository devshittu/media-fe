'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/button';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../../api/post-reset-password';
import { ResetPasswordData } from '../../types';
import { HookFormInputField } from '@/components';
import { LinedBackgroundText } from '@/components/labs';
import Link from 'next/link';
import {
  GoogleColoredIcon,
  Icon,
  TwitterColoredIcon,
} from '@/components/illustrations';
import { AppFormProps } from '@/types';
import { parseError } from '@/utils';

type ResetPasswordFormProps = AppFormProps & {
  token: string;
};
export const ResetPasswordForm = ({
  token,
  onSuccess,
  onError,
}: ResetPasswordFormProps) => {
  const pathname = usePathname();
  // const [token, setToken] = useState<string | null>(null);
  const { submit, isLoading } = useResetPassword({ onSuccess });

  const { register, handleSubmit, formState, control } =
    useForm<ResetPasswordData>({
      defaultValues: {
        password: 'commonPassword=1',
      },
      // mode: 'onChange',
      mode: 'onBlur',
    });
  // console.log('formState:// ',formState.isValid);
  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      console.error('Token is missing.');
      return;
    }
    try {
      // Submit the signup data
      await submit({ ...data, token });
    } catch (error) {
      const parsedError = parseError(error);
      console.log(parsedError);
      onError?.(
        parsedError?.error?.detail ||
          'An error occurred during password reset.',
      );
      return;
    }

    // Call the onSuccess callback if submission is successful
    onSuccess?.();
  };

  return (
    <>
      <div className="w-full max-w-[500px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center overflow-hidden w-full relative"
        >
          <div className="w-full p-6">
            <h1 className="mb-10 leading-tight text-4xl font-bold md:leading-normal sm:text-5xl text-center text-slate-900 dark:text-slate-100">
              Reset Your Password
            </h1>

            <p className="text-lg mb-10">
              Please enter a new password for your account. Once your password
              is reset, you will be redirected to the sign-in page to log in
              with your new credentials.
            </p>

            <br />

            <HookFormInputField
              name="password"
              control={control}
              placeholder="Enter your password"
              id="password"
              label="Password"
              type="password"
              showLabel
              rules={{
                required: 'Your password is required to continue',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                  message:
                    'Password must be 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character',
                },
              }}
              error={formState.errors.password}
            />
            <Button
              id={`button-sign-in`}
              type="primary"
              loading={!!isLoading}
              disabled={isLoading}
              nativeType="submit"
              className="justify-center font-semibold mt-4 w-full md:h-12"
              // onClick={openModal}
            >
              <span className="opacity-100 transition-opacity font-extrabold text-xl">
                Reset Password
              </span>{' '}
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity"
                data-connect--form-target="submitLoader"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 animate-spin currentColor"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"></path>
                </svg>
              </span>
            </Button>
            <LinedBackgroundText>or continue with</LinedBackgroundText>
            <div className="flex justify-center -mx-2">
              <Link className="p-0 mx-2 shadow" title="Facebook" href="#">
                <span className="flex items-center justify-center w-full h-full px-4 py-3">
                  <Icon icon={<GoogleColoredIcon className="w-6 h-6 mr-2" />} />
                  Google
                </span>
              </Link>{' '}
              <Link className="p-0 mx-2 shadow" title="LinkedIn" href="#">
                <span className="flex items-center justify-center w-full h-full px-4 py-3">
                  <TwitterColoredIcon className="w-6 h-6 mr-2" />
                  Twitter
                  {/* <Image className="w-auto h-full" src="https://assets.teamtailor-cdn.com/assets/connect/social/linkedin-1827062cef96d04650b14cb68f91f5e83bd5888170b386ac28b3482e6bad136d.png"> */}
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <p className="my-6 mt-0 text-slate-600 sm:my-12 sm:mt-3">
        {"I don't have an account?"} <Link href="/auth/signup">Sign up</Link>.
      </p>
    </>
  );
};

// src/features/auth/components/reset-password-form/reset-password-form.tsx
