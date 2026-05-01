/**
 * Footer Component - AidaraWell
 * 
 * Site footer with links and company information.
 */

import React from 'react';
import Link from 'next/link';
import { config } from '@/config';

export interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative overflow-hidden bg-slate-950 text-slate-300 ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="relative mb-12 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent-200 font-semibold mb-2">Need Care Quickly?</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Get a free in-home assessment within 24 hours</h3>
            <p className="text-slate-300">Speak with our care coordinator and receive a personalized next-step plan.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:(701)555-2273" className="inline-flex items-center justify-center rounded-xl border border-accent-300/40 px-5 py-3 font-semibold text-accent-100 hover:bg-accent-300/10 transition">
              Call Now
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-3 font-semibold text-white shadow-lg shadow-primary-700/25 hover:from-primary-600 hover:to-primary-800 transition">
              Schedule Assessment
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-2">
              {config.app.name}
            </h3>
            <p className="text-accent-200 font-semibold text-sm mb-4">
              Professional home care for seniors in Fargo & rural ND
            </p>
            <p className="text-slate-300 mb-4 max-w-md text-sm leading-relaxed">
              {config.app.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold text-white">Phone:</span> (701) 555-2273
              </p>
              <p className="text-sm">
                <span className="font-semibold text-white">Email:</span> {config.email.replyTo}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-white">Location:</span> Horace, North Dakota
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#personal-care" className="hover:text-accent-100 transition-colors">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/services#companionship" className="hover:text-accent-100 transition-colors">
                  Companionship
                </Link>
              </li>
              <li>
                <Link href="/services#transportation" className="hover:text-accent-100 transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link href="/services#homemaking" className="hover:text-accent-100 transition-colors">
                  Homemaking
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/why-us" className="hover:text-accent-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-accent-100 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/caregivers" className="hover:text-accent-100 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/referrals" className="hover:text-accent-100 transition-colors">
                  Referral Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-100 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400 mb-4 md:mb-0">
              © {currentYear} {config.app.name} Global LLC. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="hover:text-accent-100 transition-colors">
                Privacy Policy
              </Link>
              <a href="mailto:info@aidarawell.com" className="hover:text-accent-100 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
