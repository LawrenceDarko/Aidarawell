/**
 * Feature List Component
 * 
 * Displays a list of features with icons and descriptions.
 */

import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureListProps {
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  title?: string;
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    id: '1',
    title: 'Fast Performance',
    description: 'Lightning-fast load times and smooth user experience.',
  },
  {
    id: '2',
    title: 'Secure by Default',
    description: 'Enterprise-grade security with encryption and compliance.',
  },
  {
    id: '3',
    title: 'Scalable Infrastructure',
    description: 'Grows with your business, from startup to enterprise.',
  },
  {
    id: '4',
    title: '24/7 Support',
    description: 'Round-the-clock support from our expert team.',
  },
];

const DefaultIcon = () => (
  <svg
    className="w-6 h-6"
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
);

export function FeatureList({
  features = defaultFeatures,
  columns = 3,
  title,
  className = '',
}: FeatureListProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {feature.icon || <DefaultIcon />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
