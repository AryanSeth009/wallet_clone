'use client';

const env = {
  mongodb: {
    uri: process.env.MONGODB_URI || '',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || '',
    nextAuthUrl: process.env.NEXTAUTH_URL || '',
    nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY || '',
  },
  public: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    alphaVantageApiKey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY,
  },
} as const;

// Validate environment variables
if (!env.mongodb.uri) {
  throw new Error('MONGODB_URI is required');
}

if (!env.auth.jwtSecret) {
  throw new Error('JWT_SECRET is required');
}

if (!env.auth.nextAuthUrl) {
  throw new Error('NEXTAUTH_URL is required');
}

if (!env.auth.nextAuthSecret) {
  throw new Error('NEXTAUTH_SECRET is required');
}

if (!env.encryption.key) {
  throw new Error('ENCRYPTION_KEY is required');
}

export default env;
