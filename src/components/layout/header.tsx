// 'use client';

// import Link from 'next/link';

// export default function Header() {
//   return (
//     <header className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
//         {/* Logo / Brand Name */}
//         <div className="flex items-center">
//           <Link
//             href="/"
//             className="rounded-md text-xl font-bold tracking-tight text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-white dark:focus-visible:outline-indigo-400"
//           >
//             SCS Project Showcase
//           </Link>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex items-center gap-x-4 sm:gap-x-6">
//           <Link
//             href="/"
//             className="rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-gray-300 dark:hover:text-white dark:focus-visible:outline-indigo-400"
//           >
//             Explore
//           </Link>
          
//           <Link
//             href="/projects/new"
//             className="rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-gray-300 dark:hover:text-white dark:focus-visible:outline-indigo-400"
//           >
//             Submit Project
//           </Link>

//           <Link
//             href="/login"
//             className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
//           >
//             Sign In
//           </Link>
//         </nav>

//       </div>
//     </header>
//   );
// }
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand Name */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-md text-base sm:text-lg font-bold tracking-tight text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-white dark:focus-visible:outline-indigo-400"
          >
            SCS Project Showcase
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-6">
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

        {/* Hamburger Menu Button (Mobile Only) */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              // Close Icon (X)
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950" id="mobile-menu">
          <nav className="flex flex-col space-y-3 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-md text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Explore
            </Link>
            
            <Link
              href="/projects/new"
              onClick={() => setIsOpen(false)}
              className="rounded-md text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Submit Project
            </Link>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

