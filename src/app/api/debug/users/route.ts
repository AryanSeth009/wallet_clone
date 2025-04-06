import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  // IMPORTANT: This endpoint should be disabled in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Endpoint not available in production' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    
    const users = await User.find({}).select('email name walletAddress createdAt');
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 