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
      className={`sticky top-0 z-40 w-full border-b border-white/60 bg-white/88 backdrop-blur-xl shadow-[0_8px_30px_rgba(8,35,43,0.08)] ${className}`}
    >
      <div className="border-b border-primary-100/70 bg-gradient-to-r from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-primary-800 flex items-center justify-between gap-3">
          <p className="truncate">Trusted Fargo home care. Clinical oversight. Fast 24-48 hour starts.</p>
          <a href="tel:(701)555-2273" className="font-bold text-primary-700 hover:text-primary-900 whitespace-nowrap">
            Call (701) 555-2273
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-lg font-bold">
              A
            </span>
            <span className="text-2xl font-bold text-primary-700">
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
              className="text-primary-700 hover:text-primary-900 font-semibold text-sm md:text-base"
            >
              (701) 555-2273
            </a>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-lg shadow-primary-700/20"
            >
              Free Assessment
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
          <div className="md:hidden pb-5 space-y-2 bg-white">
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
                className="block px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 rounded-lg font-semibold text-center"
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
