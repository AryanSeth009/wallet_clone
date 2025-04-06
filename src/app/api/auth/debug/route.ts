import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  // IMPORTANT: This endpoint should be disabled in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Endpoint not available in production' }, { status: 403 });
  }

  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // First, try to find the user without selecting password
    const userInfo = await User.findOne({ email: email.toLowerCase() });
    
    if (!userInfo) {
      return NextResponse.json({
        error: 'User not found',
        userExists: false
      });
    }
    
    // If user exists, fetch with password field
    const userWithPassword = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    const passwordCheck = {
      hasPasswordField: userWithPassword.password !== undefined,
      passwordLength: userWithPassword.password ? userWithPassword.password.length : 0
    };
    
    // Check password validity
    let passwordValid = false;
    let passwordError = null;
    
    try {
      if (userWithPassword.password) {
        passwordValid = await bcrypt.compare(password, userWithPassword.password);
      }
    } catch (err: unknown) {
      passwordError = err instanceof Error ? err.message : 'Unknown error occurred';
    }
    
    return NextResponse.json({
      userFound: true,
      userId: userInfo._id.toString(),
      email: userInfo.email,
      passwordCheck,
      passwordValid,
      passwordError,
      userFields: Object.keys(userInfo._doc || userInfo)
    });
    
  } catch (error) {
    console.error('Auth debug error:', error);
    return NextResponse.json(
      { error: 'Authentication debug failed',Error :'Unknown error occurred' },
      { status: 500 }
    );
  }
} 