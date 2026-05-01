/**
 * API Validation Utilities
 * 
 * Provides Zod schema validation for API routes with consistent error handling.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ValidationError } from '@/libs/errors';

/**
 * Validation options
 */
export interface ValidationOptions {
  body?: z.ZodSchema;
  query?: z.ZodSchema;
  params?: z.ZodSchema;
}

/**
 * Validated request data
 */
export interface ValidatedRequest<TBody = unknown, TQuery = unknown, TParams = unknown> {
  body: TBody;
  query: TQuery;
  params: TParams;
  request: NextRequest;
}

/**
 * Validate API request
 */
export async function validateRequest<TBody = unknown, TQuery = unknown, TParams = unknown>(
  request: NextRequest,
  options: ValidationOptions
): Promise<ValidatedRequest<TBody, TQuery, TParams>> {
  const { body: bodySchema, query: querySchema, params: paramsSchema } = options;

  // Parse body
  let body: unknown = {};
  if (bodySchema) {
    try {
      const requestBody = await request.json();
      body = bodySchema.parse(requestBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid request body', error.errors);
      }
      throw error;
    }
  }

  // Parse query parameters
  let query: unknown = {};
  if (querySchema) {
    const url = new URL(request.url);
    const queryParams: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    try {
      query = querySchema.parse(queryParams);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid query parameters', error.errors);
      }
      throw error;
    }
  }

  // Parse route parameters (for dynamic routes)
  let params: unknown = {};
  if (paramsSchema) {
    // Note: Route params would need to be passed separately in Next.js App Router
    // This is a placeholder for future implementation
    try {
      params = paramsSchema.parse({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid route parameters', error.errors);
      }
      throw error;
    }
  }

  return {
    body: body as TBody,
    query: query as TQuery,
    params: params as TParams,
    request,
  };
}

/**
 * Create a validated API route handler
 * 
 * @example
 * ```ts
 * export const POST = withValidation(
 *   {
 *     body: z.object({ email: z.string().email() }),
 *   },
 *   async (req, { body }) => {
 *     // body is typed and validated
 *     return NextResponse.json({ success: true });
 *   }
 * );
 * ```
 */
export function withValidation<TBody = unknown, TQuery = unknown, TParams = unknown>(
  options: ValidationOptions,
  handler: (
    request: NextRequest,
    validated: ValidatedRequest<TBody, TQuery, TParams>
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const validated = await validateRequest<TBody, TQuery, TParams>(request, options);
      return await handler(request, validated);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json(
          {
            error: 'Validation error',
            message: error.message,
            details: error.details,
          },
          { status: 400 }
        );
      }

      console.error('API error:', error);
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred',
        },
        { status: 500 }
      );
    }
  };
}
