import SessionWrapper from '@/features/auth/components/session/session-wrapper';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return <SessionWrapper>{children}</SessionWrapper>;
}
