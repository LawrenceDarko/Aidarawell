/**
 * Header Component - AidaraWell Navigation
 * 
 * Conversion-focused navigation for home care agency.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { config } from '@/config';

export interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm ${className}`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">
              {config.app.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/services"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/why-us"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Why Us
            </Link>
            <Link
              href="/referrals"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Referrals
            </Link>
            <Link
              href="/caregivers"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Careers
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:(701)555-2273"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base"
            >
              (701) 555-2273
            </a>
            <Link
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Assessment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/services"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/why-us"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Why Us
            </Link>
            <Link
              href="/referrals"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Referrals
            </Link>
            <Link
              href="/caregivers"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <div className="pt-2 space-y-2 border-t border-gray-200">
              <a
                href="tel:(701)555-2273"
                className="block px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-semibold"
              >
                Call: (701) 555-2273
              </a>
              <Link
                href="/contact"
                className="block px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-semibold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule Assessment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
