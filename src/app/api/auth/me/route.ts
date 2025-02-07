import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    // Ensure database connection
    await connectToDatabase();

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Fetch user from database to get the most up-to-date information
    const user = await User.findById(token.sub);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Extract user information
    const userData = {
      id: user._id.toString(),
      email: user.email,
      username: user.name || user.email.split('@')[0],
      walletAddress: user.walletAddress || '',
      role: user.role || 'user'
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Disable caching for this route
export const dynamic = 'force-dynamic';
