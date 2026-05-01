/**
 * CTA (Call To Action) Component
 * 
 * High-conversion call-to-action sections for landing pages.
 */

import React from 'react';
import { GradientButton } from '@/components/elements/GradientButton';
import { Button } from '@/components/elements/Button';

export interface CTAProps {
  title?: string;
  headline?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  cta?: React.ReactNode;
  background?: 'primary' | 'secondary' | 'dark';
  variant?: 'default' | 'gradient' | 'minimal';
  className?: string;
}

export function CTA({
  title,
  headline,
  description,
  primaryCTA,
  secondaryCTA,
  cta,
  background,
  variant = 'default',
  className = '',
}: CTAProps) {
  const resolvedTitle = title ?? headline ?? '';
  const useLegacyLayout = Boolean(cta) || !primaryCTA;

  const variantStyles = {
    default: 'bg-slate-950 text-white',
    gradient: 'bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 text-white',
    minimal: 'bg-white text-gray-900',
  };

  const backgroundStyles = {
    primary: 'bg-gradient-to-br from-primary-50 via-white to-accent-50 text-gray-900',
    secondary: 'bg-white text-gray-900',
    dark: 'bg-slate-950 text-white',
  };

  const sectionClassName = background
    ? `${backgroundStyles[background]} ${className}`
    : `${variantStyles[variant]} ${className}`;

  return (
    <section className={`py-20 ${sectionClassName}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/40 bg-white/75 backdrop-blur-sm shadow-[0_28px_60px_rgba(10,44,52,0.14)] p-8 md:p-12 text-center">
          <p className="text-xs uppercase tracking-[0.24em] font-semibold text-primary-700 mb-4">Free Care Consultation</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-gray-900">{resolvedTitle}</h2>
          {description && (
            <p className="text-xl mb-8 text-gray-700 max-w-3xl mx-auto">{description}</p>
          )}

          {useLegacyLayout ? (
            cta ?? null
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton
                gradient={variant === 'minimal' ? 'blue' : 'green'}
                size="lg"
                asLink
                href={primaryCTA.href}
              >
                {primaryCTA.text}
              </GradientButton>

              {secondaryCTA && (
                <Button
                  variant={variant === 'minimal' ? 'outline' : 'secondary'}
                  size="lg"
                  asLink
                  href={secondaryCTA.href}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          )}

          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
            <p className="rounded-xl border border-primary-100 bg-primary-50 px-3 py-2 text-primary-800 font-medium">No-obligation assessment</p>
            <p className="rounded-xl border border-primary-100 bg-primary-50 px-3 py-2 text-primary-800 font-medium">Care starts in 24-48 hours</p>
            <p className="rounded-xl border border-primary-100 bg-primary-50 px-3 py-2 text-primary-800 font-medium">Serving Fargo + rural ND</p>
          </div>
        </div>
      </div>
    </section>
  );
}
