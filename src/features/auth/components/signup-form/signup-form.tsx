import React, { useEffect } from 'react';
import { Button } from '@/components/button';
import { useSignup } from '../../api/post-user-signup';
import { useForm } from 'react-hook-form';
import { SignupData } from '../../types';
import { InputField } from '@/components';

import { LinedBackgroundText } from '@/components/labs';
import Link from 'next/link';
import {
  GoogleColoredIcon,
  Icon,
  TwitterColoredIcon,
} from '@/components/illustrations';
import { ServerErrorResponse } from '@/types';
import { useRouter } from 'next/router';
import { useSignupStore } from '@/stores/auth';

export type SignupFormProps = {
  onSuccess: () => void;
};
export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const router = useRouter();
  const { submit, isLoading, error } = useSignup({ onSuccess });
  const { setBasicInformation } = useSignupStore();
  const { register, handleSubmit, formState, setError } = useForm<SignupData>({
    defaultValues: {
      display_name: 'Test User 20',
      email: 'test20@test.com',
      password: 'commonPassword=1',
      username: 'test20',
    },
    // mode: 'onChange',
    mode: 'onBlur',
  });

  useEffect(() => {
    if (error) {
      const serverError = error as ServerErrorResponse;
      console.log('serverError', serverError);
      if (serverError?.status_code === 400 && serverError?.error) {
        for (const [key, messages] of Object.entries(serverError.error)) {
          setError(key as keyof SignupData, {
            type: 'manual',
            message: messages[0],
          });
        }
      }
    }
  }, [error, setError]);

  const onSubmit = async (data: SignupData) => {
    console.log(data);
    //  allow saving in the signup store
    setBasicInformation(data);
    //when real data is expected to be submited to the server uncomment this and delete the onSuccess callback
    submit(data);
   
    onSuccess();
  };

  return (
    <>
      <div className="w-full max-w-[500px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center overflow-hidden w-full relative"
        >
          <div className="w-full p-6 flex flex-col space-y-4">
            <h1 className="mb-10 leading-tight text-4xl font-bold md:leading-normal sm:text-5xl text-center text-slate-900 dark:text-slate-100">
              {'Connect with us'}
            </h1>
            <InputField
              required
              placeholder="Enter your name"
              id="name"
              label="Your name"
              type="text"
              showLabel
              {...register('display_name', {
                required: 'Your name is required to continue',
                pattern: {
                  value: /^[\p{L}\p{N}\p{Z}\p{Pd}'’]+$/u,
                  message: 'Invalid name format',
                },
              })}
              error={formState.errors.display_name}
            />

            <InputField
              required
              placeholder="Enter your username"
              id="username"
              label="Username"
              type="text"
              showLabel
              {...register('username', {
                required: 'Your username is required to continue',
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    'Username can only contain letters, numbers, and underscores',
                },
              })}
              error={formState.errors.username}
            />
            <InputField
              required
              placeholder="Enter your email to continue..."
              id="email"
              label="Email"
              type="email"
              showLabel
              {...register('email', {
                required: 'Your email is required to continue',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={formState.errors.email}
            />
            <InputField
              required
              placeholder="Enter your password"
              id="password"
              label="Password"
              type="password"
              showLabel
              {...register('password', {
                required: 'Your password is required to continue',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                  message:
                    'Password must be 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character',
                },
              })}
              error={formState.errors.password}
            />

            <Button
              id={'signup-button'}
              type="primary"
              loading={!!isLoading}
              disabled={isLoading}
              nativeType="submit"
              className="justify-center font-semibold mt-4 w-full md:h-12"
            >
              <span className="opacity-100 transition-opacity">Connect</span>{' '}
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
        Already registered? <Link href="/auth/signin">Sign in</Link>.
      </p>
    </>
  );
};

// Path: src/features/auth/components/signup-form/signup-form.tsx
