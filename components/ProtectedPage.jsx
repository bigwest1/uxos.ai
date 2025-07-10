import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

/**
 * HOC to protect a page: only accessible when signed in.
 * Unauthenticated users will be redirected to Sign In.
 */
export default function ProtectedPage(PageComponent) {
  return function ProtectedWrapper(props) {
    return (
      <>
        <SignedIn>
          <PageComponent {...props} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    );
  };
}
