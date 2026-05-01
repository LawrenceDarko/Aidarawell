/**
 * Pricing Table Component
 * 
 * Displays pricing plans from config with checkout functionality.
 */

import React from 'react';
import { config } from '@/config';
import { CheckoutButton } from '@/components/elements/CheckoutButton';
import type { StripePlan } from '@/config';

export interface PricingTableProps {
  className?: string;
  onPlanSelect?: (planId: string) => void;
}

export function PricingTable({ className = '', onPlanSelect }: PricingTableProps) {
  const plans = config.stripe.plans;

  return (
    <section className={`py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that&apos;s right for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={onPlanSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  plan: StripePlan;
  onSelect?: (planId: string) => void;
}

function PricingCard({ plan, onSelect }: PricingCardProps) {
  const isPopular = plan.popular;
  const isOneTime = plan.mode === 'payment';

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
        isPopular
          ? 'ring-2 ring-blue-500 transform scale-105'
          : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
          Most Popular
        </div>
      )}

      {isOneTime && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center py-1 px-3 text-xs font-semibold rounded-bl-lg">
          One-Time
        </div>
      )}

      <div className={`p-8 ${isPopular ? 'pt-12' : ''}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="mb-6">
          <span className="text-5xl font-extrabold text-gray-900">
            ${plan.price}
          </span>
          {isOneTime ? (
            <span className="text-gray-600 ml-2 text-sm">one-time</span>
          ) : (
            <span className="text-gray-600 ml-2">
              /{plan.interval || 'month'}
            </span>
          )}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <CheckoutButton
          planId={plan.id}
          size="lg"
          className="w-full"
          onCheckout={onSelect}
        />
      </div>
    </div>
  );
}
