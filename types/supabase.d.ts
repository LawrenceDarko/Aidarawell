/**
 * Supabase Database Types
 * 
 * Type definitions for Supabase database schema.
 * Generate these types using: npx supabase gen types typescript --project-id your-project-id
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          email_verified: Date | null;
          image: string | null;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          id: string;
          name?: string | null;
          email: string;
          email_verified?: Date | null;
          image?: string | null;
          created_at?: Date;
          updated_at?: Date;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string;
          email_verified?: Date | null;
          image?: string | null;
          created_at?: Date;
          updated_at?: Date;
        };
      };
      accounts: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          provider: string;
          provider_account_id: string;
          refresh_token: string | null;
          access_token: string | null;
          expires_at: number | null;
          token_type: string | null;
          scope: string | null;
          id_token: string | null;
          session_state: string | null;
        };
        Insert: {
          id: string;
          user_id: string;
          type: string;
          provider: string;
          provider_account_id: string;
          refresh_token?: string | null;
          access_token?: string | null;
          expires_at?: number | null;
          token_type?: string | null;
          scope?: string | null;
          id_token?: string | null;
          session_state?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          provider?: string;
          provider_account_id?: string;
          refresh_token?: string | null;
          access_token?: string | null;
          expires_at?: number | null;
          token_type?: string | null;
          scope?: string | null;
          id_token?: string | null;
          session_state?: string | null;
        };
      };
      sessions: {
        Row: {
          id: string;
          session_token: string;
          user_id: string;
          expires: Date;
        };
        Insert: {
          id: string;
          session_token: string;
          user_id: string;
          expires: Date;
        };
        Update: {
          id?: string;
          session_token?: string;
          user_id?: string;
          expires?: Date;
        };
      };
      verification_tokens: {
        Row: {
          identifier: string;
          token: string;
          expires: Date;
        };
        Insert: {
          identifier: string;
          token: string;
          expires: Date;
        };
        Update: {
          identifier?: string;
          token?: string;
          expires?: Date;
        };
      };
    };
  };
}
