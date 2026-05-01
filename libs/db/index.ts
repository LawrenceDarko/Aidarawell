/**
 * Database Exports
 * 
 * Central export point for database utilities.
 * Supports both MongoDB and Supabase (configure one in .env.local)
 */

export { getDatabase, default as clientPromise } from './mongodb';
export { supabaseAdmin, getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from './supabase';
export { getAdapter } from './adapter';
