'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand Name */}
        <div className="flex items-center">
          <Link
            href="/"
            className="rounded-md text-xl font-bold tracking-tight text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-white dark:focus-visible:outline-indigo-400"
          >
            SCS Project Showcase
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-x-4 sm:gap-x-6">
          <Link
            href="/"
            className="rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-gray-300 dark:hover:text-white dark:focus-visible:outline-indigo-400"
          >
            Explore
          </Link>
          
          <Link
            href="/projects/new"
            className="rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-gray-300 dark:hover:text-white dark:focus-visible:outline-indigo-400"
          >
            Submit Project
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          >
            Sign In
          </Link>
        </nav>

      </div>
    </header>
  );
}
