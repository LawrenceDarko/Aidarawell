/**
 * Testimonials Component
 * 
 * Displays customer testimonials in Grid or Single layout.
 */

import React from 'react';
import { Rating } from '@/components/social-proof/Rating';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  content: string;
  rating?: number;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
  layout?: 'grid' | 'single';
  title?: string;
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    content:
      'This platform has transformed how we manage our operations. The ease of use and powerful features make it indispensable.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateCo',
    content:
      'Outstanding service and support. The team is responsive and the product keeps getting better with each update.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'StartupXYZ',
    content:
      'Best investment we made this year. It has saved us countless hours and improved our productivity significantly.',
    rating: 5,
  },
];

export function Testimonials({
  testimonials = defaultTestimonials,
  layout = 'grid',
  title = 'What Our Customers Say',
  className = '',
}: TestimonialsProps) {
  if (layout === 'single') {
    return (
      <TestimonialsSingle
        testimonials={testimonials}
        title={title}
        className={className}
      />
    );
  }

  return (
    <TestimonialsGrid
      testimonials={testimonials}
      title={title}
      className={className}
    />
  );
}

function TestimonialsGrid({
  testimonials,
  title,
  className,
}: Omit<TestimonialsProps, 'layout'>) {
  return (
    <section className={`py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSingle({
  testimonials,
  title,
  className,
}: Omit<TestimonialsProps, 'layout'>) {
  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <div className="space-y-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              fullWidth
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  fullWidth?: boolean;
}

function TestimonialCard({
  testimonial,
  fullWidth = false,
}: TestimonialCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-8 ${
        fullWidth ? '' : 'h-full'
      }`}
    >
      {testimonial.rating && (
        <div className="mb-4">
          <Rating value={testimonial.rating} size="md" />
        </div>
      )}

      <p className="text-gray-700 mb-6 italic leading-relaxed">
        &quot;{testimonial.content}&quot;
      </p>

      <div className="flex items-center">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
            <span className="text-gray-600 font-semibold">
              {testimonial.name[0]}
            </span>
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
