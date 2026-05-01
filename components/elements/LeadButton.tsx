/**
 * Lead Button Component
 * 
 * Optimized button for lead generation and conversions.
 */

import React from 'react';
import Link from 'next/link';

export interface LeadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
}

const sizeStyles = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function LeadButton({
  size = 'md',
  asLink = false,
  href,
  children,
  className = '',
  ...props
}: LeadButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300';

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${className}`;

  if (asLink && href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
