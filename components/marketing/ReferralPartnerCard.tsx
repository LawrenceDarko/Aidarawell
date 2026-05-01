import React from 'react';

export interface ReferralPartnerCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

export function ReferralPartnerCard({
  icon,
  title,
  description,
  benefits,
}: ReferralPartnerCardProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
      <div className="mb-4 text-primary-600 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="text-sm text-gray-700 flex items-start">
            <span className="text-primary-600 mr-2 flex-shrink-0">→</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
