/**
 * Hero Component
 *
 * Homecare-focused hero section with support for both the current and legacy prop shapes.
 */

import React from 'react';
import { GradientButton } from '@/components/elements/GradientButton';

export interface HeroProps {
  title?: string;
  headline?: string;
  subtitle?: string;
  subheadline?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: string;
  backgroundImage?: string;
  cta?: React.ReactNode;
  background?: 'primary' | 'secondary' | 'dark';
  className?: string;
}

export function Hero({
  title,
  headline,
  subtitle,
  subheadline,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  backgroundImage,
  cta,
  background,
  className = '',
}: HeroProps) {
  const resolvedTitle = title ?? headline ?? 'Compassionate Home Care in Fargo';
  const resolvedSubtitle = subtitle ?? subheadline ?? 'Professional support when your family needs it most';
  const resolvedDescription =
    description ??
    'Personal care, companionship, and senior transportation for families across Fargo, Cass County, and surrounding communities.';
  const resolvedImage = image ?? backgroundImage;

  const sectionClasses =
    background === 'secondary'
      ? 'bg-gradient-to-br from-white via-primary-50 to-slate-50'
      : background === 'dark'
        ? 'bg-slate-950 text-white'
        : 'bg-gradient-to-br from-primary-50 via-white to-amber-50';

  return (
    <section className={`relative overflow-hidden ${sectionClasses} ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-primary-700 uppercase tracking-[0.2em] mb-4">
              {resolvedSubtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 max-w-2xl leading-tight">
              {resolvedTitle}
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
              {resolvedDescription}
            </p>

            {cta ? (
              cta
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton gradient="blue" size="lg" asLink href={primaryCTA?.href ?? '/contact'}>
                  {primaryCTA?.text ?? 'Schedule Free Assessment'}
                </GradientButton>

                {(secondaryCTA?.href || !primaryCTA) && (
                  <GradientButton
                    gradient="green"
                    size="lg"
                    asLink
                    href={secondaryCTA?.href ?? 'tel:(701)555-2273'}
                  >
                    {secondaryCTA?.text ?? 'Call Now: (701) 555-2273'}
                  </GradientButton>
                )}
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="rounded-2xl bg-white/80 backdrop-blur border border-primary-100 p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary-700">12+ years</p>
                <p className="text-sm text-gray-600">Clinical healthcare experience</p>
              </div>
              <div className="rounded-2xl bg-white/80 backdrop-blur border border-primary-100 p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary-700">24-48 hrs</p>
                <p className="text-sm text-gray-600">Typical care start time</p>
              </div>
              <div className="rounded-2xl bg-white/80 backdrop-blur border border-primary-100 p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary-700">Fargo + rural</p>
                <p className="text-sm text-gray-600">Local and surrounding communities</p>
              </div>
            </div>
          </div>

          <div>
            {resolvedImage ? (
              <img
                src={resolvedImage}
                alt={resolvedTitle}
                className="rounded-[2rem] shadow-2xl object-cover w-full h-[520px]"
              />
            ) : (
              <div className="relative rounded-[2rem] shadow-2xl overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-amber-500 p-8 min-h-[520px] flex items-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_45%)]" />
                <div className="relative text-white max-w-md">
                  <div className="mb-6 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                    Trusted home care support
                  </div>
                  <p className="text-3xl font-bold leading-tight mb-4">
                    Help with daily living, transportation, and companionship.
                  </p>
                  <p className="text-white/90 text-base leading-relaxed">
                    Built for seniors, adult children, and referral partners who need reliable care without delay.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
