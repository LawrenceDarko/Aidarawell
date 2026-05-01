/**
 * Rating Component
 * 
 * Displays star ratings with customizable size and display options.
 */

import React from 'react';

export interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className = '',
}: RatingProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const filledStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Filled Stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <Star key={`filled-${i}`} filled size={sizeStyles[size]} />
      ))}

      {/* Half Star */}
      {hasHalfStar && <StarHalf size={sizeStyles[size]} />}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} filled={false} size={sizeStyles[size]} />
      ))}

      {/* Value Display */}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
}

interface StarProps {
  filled: boolean;
  size: string;
}

function Star({ filled, size }: StarProps) {
  return (
    <svg
      className={`${size} ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarHalf({ size }: { size: string }) {
  return (
    <div className={`${size} relative`}>
      <svg
        className={`${size} text-gray-300 absolute`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        className={`${size} text-yellow-400 absolute overflow-hidden`}
        fill="currentColor"
        viewBox="0 0 20 20"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  );
}
