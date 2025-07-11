import { SignUp, GoogleOneTap } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';
export default function SignUpPage() {
  return (
    <>
      <GoogleOneTap />
      <SignUp path="/sign-up" routing="path" />
    </>
  );
}
