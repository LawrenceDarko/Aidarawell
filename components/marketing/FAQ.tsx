/**
 * FAQ Component
 * 
 * Frequently Asked Questions section with accordion functionality.
 */

'use client';

import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items?: FAQItem[];
  title?: string;
  className?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: 'What is included in the free trial?',
    answer:
      'Our free trial includes full access to all features for 14 days. No credit card required.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. Your access will continue until the end of the current billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through Stripe.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes, we offer a 30-day money-back guarantee. If you are not satisfied, contact us within 30 days for a full refund.',
  },
  {
    question: 'How do I upgrade or downgrade my plan?',
    answer:
      'You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use industry-standard encryption and security practices to protect your data. We are SOC 2 compliant and GDPR ready.',
  },
];

export function FAQ({
  items = defaultItems,
  title = 'Frequently Asked Questions',
  className = '',
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our service
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="font-semibold text-gray-900">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
