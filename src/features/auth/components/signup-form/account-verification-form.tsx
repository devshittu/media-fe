import React, { useEffect } from 'react';
import { Button } from '@/components/button';
import { useForm } from 'react-hook-form';
import { VerifyAccountData } from '../../types';
import { ServerErrorResponse } from '@/types';
import PinInput from '@/components/form/pin-input/pin-input';
import { PinInputStatus } from '@/components/form/pin-input/types';
import { useVerifyAccount } from '../../api/post-verify-account';
import { Hint } from '@/components/blocks/hint';
export type AccountVerificationFormProps = {
  onSuccess: () => void;
};
export const AccountVerificationForm = ({
  onSuccess,
}: AccountVerificationFormProps) => {
  const { submit, isLoading, error } = useVerifyAccount({ onSuccess });
  const { control, watch, register, handleSubmit, formState, setError } =
    useForm<VerifyAccountData>({
      defaultValues: {
        otp: '',
        email: 'test100@test.com',
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

    submit(data);
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
            <h1 className="mb-6 text-3xl font-bold leading-tight text-center text-slate-900 dark:text-slate-100">
              Account verification
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
              type="primary"
              loading={!!isLoading}
              disabled={isLoading}
              nativeType="submit"
              className="justify-center font-semibold mt-4 w-full md:h-12"
            >
              <span className="opacity-100 transition-opacity">Verify</span>{' '}
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
          </div>
        </form>
      </div>
    </>
  );
};

// Path: src/features/auth/components/signup-form/signup-form.tsx
