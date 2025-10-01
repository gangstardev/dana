'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <div className="sticky top-0 z-50 bg-gray-900 border-b border-green-500 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-300 text-xs">
            توسعه داده شده توسط{' '}
            <Link 
              href="https://19ga.ir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              محمد کیان استادمحمدی
            </Link>
            {' '} | تشکر ویژه از آقای هزار خانی
          </p>
        </div>
      </div>
    </div>
  );
}
