import React from 'react';

export interface FeatureDifferentiatorProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureDifferentiator({
  icon,
  title,
  description,
}: FeatureDifferentiatorProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 hover:border-primary-200 hover:shadow-md transition duration-300">
      <div className="mb-4 text-accent-500 text-3xl">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
