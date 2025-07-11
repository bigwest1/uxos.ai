import { SignIn, GoogleOneTap } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';
export default function SignInPage() {
  return (
    <>
      <GoogleOneTap />
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </>
  );
}
