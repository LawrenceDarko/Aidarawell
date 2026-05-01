/**
 * User Model
 * 
 * Represents a user in the system.
 * Compatible with both MongoDB and Supabase.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  
  // OAuth provider information
  accounts?: UserAccount[];
  
  // Additional user metadata
  role?: 'user' | 'admin';
  subscriptionId?: string | null;
}

/**
 * User Account (OAuth Provider)
 * 
 * Stores OAuth provider account information linked to a user.
 */
export interface UserAccount {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}

/**
 * User Session
 * 
 * Represents an active user session.
 */
export interface UserSession {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  };
  expires: string;
}

/**
 * Magic Link Token
 * 
 * Stores magic link token information for email authentication.
 */
export interface MagicLinkToken {
  identifier: string; // email
  token: string;
  expires: Date;
}
