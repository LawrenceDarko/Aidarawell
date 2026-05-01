/**
 * Gradient Button Component
 * 
 * High-conversion button with gradient styling for CTAs.
 */

import React from 'react';
import Link from 'next/link';

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  gradient?: 'blue' | 'purple' | 'green' | 'orange';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
}

const gradientStyles = {
  blue: 'from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800',
  purple: 'from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black',
  green: 'from-accent-500 to-accent-700 hover:from-accent-600 hover:to-accent-800',
  orange: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export function GradientButton({
  size = 'md',
  gradient = 'blue',
  asLink = false,
  href,
  children,
  className = '',
  ...props
}: GradientButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-white rounded-xl bg-gradient-to-r shadow-lg hover:shadow-xl shadow-primary-900/20 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:ring-offset-white';

  const combinedClassName = `${baseStyles} ${gradientStyles[gradient]} ${sizeStyles[size]} ${className}`;

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
