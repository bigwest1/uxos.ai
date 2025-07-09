import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

/**
 * Site navigation bar with links and theme toggle.
 */
export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/"><a className="text-gray-200 hover:text-white">Home</a></Link>
        <Link href="/tools/flow"><a className="text-gray-200 hover:text-white">Flow Hacker</a></Link>
        <Link href="/tools/chat"><a className="text-gray-200 hover:text-white">AI Chat</a></Link>
        <Link href="/gdpr"><a className="text-gray-200 hover:text-white">GDPR</a></Link>
        <Link href="/admin/users"><a className="text-red-400 hover:text-red-600">Admin</a></Link>
      </div>
      <ThemeSwitcher />
    </nav>
  );
}
