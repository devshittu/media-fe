import { Loading } from '@/components/loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default async function Page() {
  return (
    <>
      <Loading />
    </>
  );
}
// Output: <title>About | Acme</title>
