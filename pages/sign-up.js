import { SignUp, GoogleOneTap } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <>
      <GoogleOneTap />
      <SignUp path="/sign-up" routing="path" />
    </>
  );
}
