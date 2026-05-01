/**
 * SEO Helpers
 * 
 * This module provides SEO utilities including:
 * - Dynamic metadata generation
 * - Open Graph tags
 * - Structured data
 * - Twitter cards
 */

import { Metadata } from 'next';
import { config } from '@/config';

export interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

/**
 * Generate metadata from config with optional overrides
 */
export function generateMetadata(options?: SEOOptions): Metadata {
  const title = options?.title || config.seo.title;
  const description = options?.description || config.seo.description;
  const keywords = options?.keywords || config.seo.keywords;
  const image = options?.image || config.seo.ogImage || `${config.app.url}/og-image.png`;
  const url = options?.url || config.app.url;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(config.app.url),
    robots: {
      index: !options?.noindex,
      follow: !options?.noindex,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: config.app.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: options?.type === 'product' ? 'website' : options?.type || 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredData(
  type: 'Organization' | 'WebSite' | 'Product' | 'Article',
  data?: Record<string, unknown>
): object {
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...base,
        name: config.app.name,
        url: config.app.url,
        description: config.app.description,
        ...data,
      };

    case 'WebSite':
      return {
        ...base,
        name: config.app.name,
        url: config.app.url,
        ...data,
      };

    default:
      return { ...base, ...data };
  }
}

/**
 * Get SEO configuration
 */
export function getSeoConfig() {
  return config.seo;
}
