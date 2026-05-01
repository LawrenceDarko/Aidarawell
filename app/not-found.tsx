/**
 * 404 Not Found Page
 * 
 * Custom 404 page for better user experience.
 */

import Link from 'next/link';
import { Button } from '@/components/elements/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asLink href="/" variant="primary" size="lg">
            Go Home
          </Button>
          <Button
            asLink
            href="/pricing"
            variant="outline"
            size="lg"
          >
            View Pricing
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Pricing
            </Link>
            <Link
              href="/features"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
