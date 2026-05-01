/**
 * Feature Accordion Component
 * 
 * Expandable feature list with detailed descriptions.
 */

'use client';

import React, { useState } from 'react';

export interface FeatureAccordionItem {
  id: string;
  title: string;
  description: string;
  details?: string;
  icon?: React.ReactNode;
}

export interface FeatureAccordionProps {
  items: FeatureAccordionItem[];
  title?: string;
  allowMultiple?: boolean;
  className?: string;
}

const defaultItems: FeatureAccordionItem[] = [
  {
    id: '1',
    title: 'Advanced Analytics',
    description: 'Track your performance with real-time analytics.',
    details:
      'Get detailed insights into your metrics with customizable dashboards, automated reports, and data export capabilities.',
  },
  {
    id: '2',
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team.',
    details:
      'Share projects, assign tasks, and communicate in real-time. Built-in chat and notification system keeps everyone in sync.',
  },
  {
    id: '3',
    title: 'API Access',
    description: 'Integrate with your existing tools and workflows.',
    details:
      'Comprehensive REST API with webhooks support. Full documentation and SDKs for popular programming languages.',
  },
];

const DefaultIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export function FeatureAccordion({
  items = defaultItems,
  title,
  allowMultiple = false,
  className = '',
}: FeatureAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([items[0]?.id]));

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);

            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center space-x-4">
                    {item.icon && (
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {item.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
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

                {isOpen && item.details && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
