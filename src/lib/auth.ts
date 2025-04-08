import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectMongoDB from '@/lib/mongodb';
import dbConnect from "@/lib/dbConnect";

// Extend the built-in NextAuth user type with our custom properties
interface ExtendedUser extends NextAuthUser {
  walletAddress?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
    userId: string;
    email: string;
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
}

export const getTokenFromHeader = (req: NextApiRequest): string | null => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set');
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          throw new Error('Please enter an email and password');
        }

        try {
          await dbConnect();
          console.log('Attempting to authenticate:', credentials.email);
          
          const user = await User.findOne({ email: credentials.email.toLowerCase() }).select('+password');
          
          if (!user) {
            console.error('User not found:', credentials.email);
            throw new Error('Invalid email or password');
          }
          
          console.log('User found, checking password');
          console.log('User has password:', !!user.password, typeof user.password);

          if (!user.password || typeof user.password !== 'string') {
            console.error('Password is not valid for comparison');
            throw new Error('Invalid email or password');
          }

          let isPasswordValid = false;
          try {
            isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          } catch (bcryptError) {
            console.error('bcrypt comparison error:', bcryptError);
            throw new Error('Authentication failed. Please try again.');
          }
          
          if (!isPasswordValid) {
            console.error('Invalid password for user:', credentials.email);
            throw new Error('Invalid email or password');
          }

          console.log('Authentication successful for:', credentials.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email.split('@')[0],
            walletAddress: user.walletAddress || ''
          } as ExtendedUser;
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: "/home",
    error: "/home",
    newUser: "/home"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || user.email.split('@')[0];
        token.profileImage = user.profileImage || user.image || undefined;
        token.walletAddress = (user as ExtendedUser).walletAddress;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        if (token.name) {
          session.user.name = token.name;
        }
        if (token.profileImage) {
          session.user.image = token.profileImage as string;
        }
        
        (session.user as ExtendedUser).walletAddress = token.walletAddress as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};
