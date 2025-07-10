import { SignIn, GoogleOneTap } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <>
      <GoogleOneTap />
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </>
  );
}
