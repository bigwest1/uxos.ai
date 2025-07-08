// Prominent, accessible download button with subtle animation
import React from 'react';
import { BoltIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/outline";


export default function DownloadButton() {
  return (
    <a
      href="/download"
      className="inline-block rounded-md bg-brand-orange px-6 py-3 font-semibold text-white shadow transition hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
    >
      Get the App
    </a>
  );
}
