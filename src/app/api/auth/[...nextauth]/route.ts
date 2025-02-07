import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set');
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize called with credentials:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          throw new Error('Please enter an email and password');
        }

        try {
          console.log('Attempting to connect to database');
          await connectToDatabase();
          console.log('Database connection successful');
          
          const user = await User.findOne({ email: credentials.email.toLowerCase() }).select('+password');
          console.log('User found:', !!user);
          
          if (!user) {
            console.error('User not found');
            throw new Error('Invalid email or password');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log('Password validation:', isPasswordValid);
          
          if (!isPasswordValid) {
            console.error('Invalid password');
            throw new Error('Invalid email or password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email.split('@')[0],
          };
        } catch (error) {
          console.error('Full authentication error:', error);
          throw error; // Pass the error through for better debugging
        }
      }
    })
  ],
  pages: {
    signIn: "/home",  // Redirect to home for unauthenticated users
    error: "/home",   // Redirect errors to home
    newUser: "/home"  // Redirect new users to home
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add additional user information to the token
        token.id = user.id;
        token.email = user.email;
        token.name = user.name || user.email.split('@')[0];
        token.profileImage = user.profileImage || user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        
        // Add profile image to session
        if (token.profileImage) {
          session.user.profileImage = token.profileImage as string;
          session.user.image = token.profileImage as string;
        }
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug logging only in development environment
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
