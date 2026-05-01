'use client';

import { useState } from 'react';

export interface StickyCallButtonProps {
  phoneNumber?: string;
  assessmentLink?: string;
}

export function StickyCallButton({
  phoneNumber = '(701) 555-CARE',
  assessmentLink = '/contact',
}: StickyCallButtonProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 pr-2">
            <p className="text-white text-xs font-semibold mb-1">Need Help?</p>
            <div className="flex gap-2">
              <a
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className="flex-1 bg-white text-primary-600 px-3 py-2 rounded font-semibold text-sm text-center hover:bg-accent-50 transition"
              >
                Call Now
              </a>
              <a
                href={assessmentLink}
                className="flex-1 border border-white text-white px-3 py-2 rounded font-semibold text-sm text-center hover:bg-primary-700 transition"
              >
                Assessment
              </a>
            </div>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-white hover:text-accent-300 transition flex-shrink-0 ml-2"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
