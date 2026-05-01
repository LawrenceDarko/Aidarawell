/**
 * Database Exports
 * 
 * Central export point for database utilities.
 * Supabase is the configured database backend.
 */

export { supabaseAdmin, getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from './supabase';
export { getAdapter } from './adapter';
