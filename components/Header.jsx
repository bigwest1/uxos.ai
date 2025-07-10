import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-brand-dark px-6 py-4 text-white">
      <Link href="/">
        <a className="text-lg font-bold">UXOS.ai</a>
      </Link>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}
