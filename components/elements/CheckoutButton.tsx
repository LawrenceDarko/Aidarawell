/**
 * Checkout Button Component
 * 
 * Specialized button for Stripe checkout flows.
 */

'use client';

import React, { useState } from 'react';
import { config } from '@/config';

export interface CheckoutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  planId: string;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onCheckout?: (planId: string) => void | Promise<void>;
  children?: React.ReactNode;
}

const sizeStyles = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function CheckoutButton({
  planId,
  size = 'md',
  isLoading: externalLoading = false,
  onCheckout,
  children,
  className = '',
  disabled,
  ...props
}: CheckoutButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const plan = config.stripe.plans.find((p) => p.id === planId);
  const isLoading = externalLoading || internalLoading;

  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const handleClick = async () => {
    if (onCheckout) {
      setInternalLoading(true);
      try {
        await onCheckout(planId);
      } finally {
        setInternalLoading(false);
      }
      return;
    }

    // Default checkout flow - call API endpoint
    setInternalLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setInternalLoading(false);
    }
  };

  /**
   * Generate display text based on payment mode
   * - Subscription: "Subscribe for $X/month"
   * - One-time: "Buy for $X" or "Get Lifetime Access"
   */
  const getDisplayText = () => {
    if (children) return children;
    if (!plan) return 'Get Started';

    if (plan.mode === 'payment') {
      // One-time payment
      return `Buy for $${plan.price}`;
    } else {
      // Subscription
      return `Subscribe for $${plan.price}/${plan.interval || 'month'}`;
    }
  };

  const displayText = getDisplayText();

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading || !plan}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {displayText}
        </>
      )}
    </button>
  );
}
