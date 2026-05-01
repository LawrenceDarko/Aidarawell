/**
 * Analytics Integration
 * 
 * Basic analytics tracking for page views and events.
 * Supports Google Analytics and custom event tracking.
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }

  // Custom analytics
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
    // Send to your analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        url,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Custom analytics
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'event',
        eventName,
        eventParams,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }
}

/**
 * React hook for automatic page view tracking
 */
export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}
