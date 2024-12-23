'use client';
import { Button } from '@/components/button';
import { usePasswordSignin } from '../../api/post-password-signin';
import { useForm } from 'react-hook-form';
import { PasswordSigninData } from '../../types';
import { HookFormInputField } from '@/components';
import { signIn } from 'next-auth/react';
import { LinedBackgroundText } from '@/components/labs';
import Link from 'next/link';
import {
  GoogleColoredIcon,
  Icon,
  TwitterColoredIcon,
} from '@/components/illustrations';
import { AppFormProps } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Route } from 'next';
import { useState } from 'react';

export const SigninForm = ({ onSuccess }: AppFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const signin = usePasswordSignin({ onSuccess });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, formState, control } =
    useForm<PasswordSigninData>({
      defaultValues: {
        username_or_email: 'testuser2@test.com',
        password: 'commonPassword=1',
      },
      // mode: 'onChange',
      mode: 'onBlur',
    });
  // console.log('formState:// ',formState.isValid);
  // const onSubmit = (data: PasswordSigninData) => {
  //   signin.submit(data);
  // };

  const onSubmit = async (data: PasswordSigninData) => {
    // whatever your type
    const callbackUrl = searchParams?.get('callbackUrl');

    try {
      setLoading(true);
      await signIn('credentials', {
        redirect: false,
        email: data.username_or_email,
        password: data.password,
      }).then((res: any | undefined) => {
        if (!res) {
          alert('No response!');
          return;
        }

        if (!res.ok) alert('Something went wrong!');
        else if (res.error) {
          console.log(res.error);

          if (res.error == 'CallbackRouteError')
            alert('Could not login! Please check your credentials.');
          else alert(`Internal Server Error: ${res.error}`);
        } else {
          if (callbackUrl) router.push(callbackUrl as Route);
          else router.push('/stories');
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
              Sign in to continue
            </h1>

            <HookFormInputField
              name="username_or_email"
              control={control}
              placeholder="Enter your email to continue..."
              id="username_or_email"
              label="Email"
              type="email"
              showLabel
              rules={{
                required: 'Your email or username is required to continue',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email or username address',
                },
              }}
              error={formState.errors.username_or_email}
            />

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
              }}
              error={formState.errors.password}
            />
            <Button
              id={`button-sign-in`}
              type="primary"
              loading={!!loading}
              disabled={loading}
              nativeType="submit"
              className="justify-center font-semibold mt-4 w-full md:h-12"
              // onClick={openModal}
            >
              <span className="opacity-100 transition-opacity font-extrabold text-xl">
                Signin
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
              <Link
                className="p-0 mx-2 shadowx"
                title="Forgot Password"
                href="/auth/forgot-password"
              >
                <span className="flex items-center justify-center w-full h-full px-4 py-3">
                  Forgot password?
                </span>
              </Link>
            </div>
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

// src/features/auth/components/signin-form/signin-form.tsx
