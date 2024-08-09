'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/button';
import { useForm } from 'react-hook-form';
import { VerifyAccountData } from '../../types';
import { ServerErrorResponse } from '@/types';
import PinInput from '@/components/form/pin-input/pin-input';
import { PinInputStatus } from '@/components/form/pin-input/types';
import { useVerifyAccount } from '../../api/post-verify-account';
import { Hint } from '@/components/blocks/hint';
import { useSignupStore } from '@/stores/auth';
export type AccountVerificationFormProps = {
  onSuccess: () => void;
};
export const AccountVerificationForm = ({
  onSuccess,
}: AccountVerificationFormProps) => {
  // Access store methods.
  const { setOTP, basicInformation } = useSignupStore();
  const { submit, isLoading, error } = useVerifyAccount({ onSuccess });
  const { control, watch, register, handleSubmit, formState, setError } =
    useForm<VerifyAccountData>({
      defaultValues: {
        otp: '',
        email: basicInformation?.email || '',
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
          setError(key as keyof VerifyAccountData, {
            type: 'manual',
            message: messages[0],
          });
        }
      }
    }
  }, [error, setError]);

  const onSubmit = async (data: VerifyAccountData) => {
    console.log(data);
    setOTP(data.otp);
    // TODO uncomment when ready to submit to server.
    submit(data);
    onSuccess();
  };

  return (
    <>
      <div className="w-full max-w-[500px]">
        <>Email: {basicInformation?.email}</>
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

// Path: src/features/auth/components/signup-form/signup-form.tsx
