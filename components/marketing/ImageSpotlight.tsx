import React from 'react';

export interface ImageSpotlightProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets?: string[];
  reverse?: boolean;
}

export function ImageSpotlight({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  bullets = [],
  reverse = false,
}: ImageSpotlightProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div
          className={`grid gap-10 lg:gap-14 items-center ${
            reverse ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-[0.95fr_1.05fr]'
          }`}
        >
          <div className={reverse ? 'lg:order-2' : ''}>
            <p className="text-sm font-semibold text-primary-700 uppercase tracking-[0.2em] mb-4">
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl">
              {description}
            </p>

            {bullets.length > 0 && (
              <div className="space-y-3">
                {bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-primary-50/60 px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-700">{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={reverse ? 'lg:order-1' : ''}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-gray-100 bg-gray-100">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}