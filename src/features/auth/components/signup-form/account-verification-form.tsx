'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import { useForm } from 'react-hook-form';
import { VerifyAccountData } from '../../types';
import { ServerErrorResponse } from '@/types';
import PinInput from '@/components/form/pin-input/pin-input';
import { PinInputStatus } from '@/components/form/pin-input/types';
import { useVerifyAccount } from '../../api/post-verify-account';
import { Hint } from '@/components/blocks/hint';
import { useSignupStore } from '@/stores/auth';
import { useSession } from 'next-auth/react';
import { Link } from '@/components/labs'; 
import { CountdownTimer } from '@/components/countdown/countdown-timer';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/illustrations';
import { useCountdownContext } from '@/components/countdown';
import { useResendOtp } from '../../api/post-resend-otp';
import { useSignout } from '@/features/auth/hooks/useSignout';
export type AccountVerificationFormProps = {
  onSuccess: () => void;
  onError?: (message: string) => void;
};
export const AccountVerificationForm = ({
  onSuccess, onError 
}: AccountVerificationFormProps) => {
  const { signout } = useSignout();

  // Access store methods.
  const { setOTP, basicInformation } = useSignupStore();
  const { data: session } = useSession(); // Access the session data
  const { submit, isLoading, error } = useVerifyAccount({ onSuccess });

  const { submit: resend, isLoading: isResending, error: resendError } = useResendOtp({
    onSuccess: () => handleReset(),
    onError: (errorMessage) => console.error(errorMessage),
  });
  const { control, watch, register, handleSubmit, formState, setError, setValue, getValues } =
    useForm<VerifyAccountData>({
      defaultValues: {
        otp: '',
        email: '',
        // email: session?.user?.email || basicInformation?.email || '',
      },
      // mode: 'onChange',
      mode: 'onBlur',
    });


  const { startCountdown, timeLeft, resetCountdown } = useCountdownContext();
  const [canResend, setCanResend] = useState(false);

useEffect(() => {
  const email = session?.user?.email || basicInformation?.email || '';
  setValue('email', email); // Update the email field value
}, [session?.user?.email, basicInformation?.email, setValue]);

  useEffect(() => {
    if (error) {
      const serverError = error as unknown as ServerErrorResponse;
      console.log('serverError', serverError);
      if (serverError?.status_code === 400 && serverError?.error) {
        for (const [key, messages] of Object.entries(serverError.error)) {
          setError(key as keyof VerifyAccountData, {
            type: 'manual',
            message: messages[0],
          });
        }
      }
    }
  }, [error, setError]);

  useEffect(() => {
    startCountdown(0, 0, 5); // Start a 2-minute countdown

    const interval = setInterval(() => {
      if (timeLeft === '00:00:00') {
        setCanResend(true);
        clearInterval(interval); // Stop the interval when the countdown ends
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timeLeft, startCountdown]);

  const handleReset = () => {
    resetCountdown(0, 0, 10); // Reset countdown to 5 minutes
    setCanResend(false);
  };
  const handleEnd = () => {
        console.log('Countdown ended in layout');
        // Trigger metadata generation or other actions here
    };

  const onSubmit = async (data: VerifyAccountData) => {
    console.log('VerifyAccountData:// ',data);
    setOTP(data.otp);
    // ready to submit to server.


  try {
    // Submit the signup data
    await submit(data);
  } catch (error) {
  // Cast error to unknown first, then assert it as ServerErrorResponse
  const serverError = error as unknown as ServerErrorResponse;

  // Now you can access status_code and error properties safely
  if (serverError?.status_code === 400) {
    const errorMessage = Object.values(serverError.error).flat().join(', ');
    onError?.(errorMessage);
  } else {
    onError?.('An unexpected error occurred. Please try again later.');
  }
  return;
  }

  // Call the onSuccess callback if submission is successful
  onSuccess?.();
  };



  const handleResendOtp = () => {
    resend({ email: getValues('email') });
  };
  return (
    <>
    
      <div className="w-full max-w-[500px]">

<nav id="navbar" className=" flex w-full flex-row justify-end px-4x sm:justify-between">
    
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex flex-row gap-4">
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 text-slate-900 dark:text-slate-100"
          >
            <ChevronLeftIcon className="w-8 stroke-2" />
            <ArrowLeftIcon className="w-6 stroke-2" />
          </Link>
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 text-slate-900 dark:text-slate-100"
          >Home
          </Link>
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="flex items-center md:hidden md:ml-auto space-x-8 lg:flex">
            <li>
              <Link
                href="/auth/signin"
                aria-label="Sign in"
                title="Sign in"
                className="font-medium tracking-wide text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:text-cyan-400"
              >
                <span className="font-inter ">Sign in</span>
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-slate-100 dark:text-slate-900 transition duration-200 shadow-md bg-cyan-400 hover:bg-cyan-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                // outlined
                // type="primary"
              >
                <span className="font-inter ">Sign up</span>
              </Link>
            </li>
            <li>

    <Link href="#"
                aria-label="Sign in"
                title="Sign in"
                className="font-medium tracking-wide text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:text-cyan-400" onClick={(event) => {
      event.preventDefault(); // Prevent default link behavior
      signout(); // Call signout function
    }}>
      
                <span className="font-inter ">Sign Out</span>
    </Link>
            </li>
          </ul>
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 text-slate-900 dark:text-slate-100"
          >
            <ChevronRightIcon className="w-8 stroke-2" />
          </Link>
        </div>
      </div>
</nav>
             
         
      <header className="p-4 bg-gray-100 dark:bg-gray-800">
        <span className="text-lg">{`Time left is ${timeLeft}.`}</span>
      </header>
      
      <p className="text-lg">
        {canResend ? 'You can now resend the verification link.' : `You can resend the verification link in ${timeLeft}.`}
      </p>
      {canResend && (
        <button onClick={handleResendOtp} disabled={isResending} className="mt-4 p-2 bg-blue-500 text-white rounded">
          {isResending ? 'Resending...' : 'Resend OTP'}
        </button>
      )}

        <>Email: {session?.user?.email || basicInformation?.email || ''}</>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center overflow-hidden w-full relative"
        >
          <div className="w-full p-6 flex flex-col space-y-4">
            <h1 className="mb-10 leading-tight text-4xl font-bold md:leading-normal sm:text-5xl text-center text-slate-900 dark:text-slate-100">
              {'Account verification'}
            </h1>
            <input type="hidden" {...register('email')} />

            <PinInput
              control={control}
              name="otp"
              id="auth-token"
              pinLength={6}
              pinInputStatus={PinInputStatus.AUTHENTICATING}
              error={formState.errors.otp}
              watch={watch}
              disabled
            />

            <div className="text-xs md:text-sm">
              <Hint
                description=" A PIN or token has been sent to your email address. Please check your
          inbox or spam folder. It should arrive within the next 15 minutes.
          Keep this page open until you receive it."
                notes="After three unsuccessful attempts, you will be
          prevented from requesting another token for 30 minutes."
              />
            </div>
            <br />
            <Button
              id={`button-verify-account`}
              type="primary"
              loading={!!isLoading}
              disabled={isLoading}
              nativeType="submit"
              className="justify-center font-semibold mt-4 w-full md:h-12"
            >
              <span className="opacity-100 transition-opacity">Verify</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

// Path: src/features/auth/components/signup-form/account-verification-form.tsx
