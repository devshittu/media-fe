import TokenPinInputField, { UserLoginStatus } from '@/components/form/token-pin-digit';
import React from 'react';

export const Token = () => {
  return <div><TokenPinInputField id='auth-token' pinLength={4} userLoginStatus={UserLoginStatus.LOGGED_OUT}/></div>;
};
