import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  // For security, this endpoint should be disabled in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Endpoint not available in production' }, { status: 403 });
  }

  try {
    const { email, password, fix } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Find the user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found with that email' },
        { status: 404 }
      );
    }
    
    // Check if password is valid for bcrypt
    const passwordCheck = {
      exists: !!user.password,
      type: typeof user.password,
      length: user.password ? user.password.length : 0,
      isBcryptHash: user.password ? user.password.startsWith('$2') : false
    };
    
    // Test password validity
    let passwordValid = false;
    let passwordError = null;
    
    if (user.password) {
      try {
        passwordValid = await bcrypt.compare(password, user.password);
      } catch (err: unknown) {
        passwordError = {
          message: err instanceof Error ? err.message : 'Unknown error occurred',
          name: err instanceof Error ? err.name : 'Error'
        };
      }
    }
    
    // Fix password if requested and needed
    let fixResult = null;
    
    if (fix && (!passwordValid || passwordError)) {
      try {
        // Hash the provided password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Update user's password
        user.password = hashedPassword;
        await user.save();
        
        // Verify new password
        const newPasswordValid = await bcrypt.compare(password, hashedPassword);
        
        fixResult = {
          passwordFixed: true,
          newPasswordLength: hashedPassword.length,
          verificationAfterFix: newPasswordValid
        };
      } catch (fixErr) {
        fixResult = {
          passwordFixed: false,
          error: fixErr instanceof Error ? fixErr.message : 'Unknown error'
        };
      }
    }
    
    return NextResponse.json({
      userFound: true,
      email: user.email,
      passwordCheck,
      passwordValid,
      passwordError,
      fixResult
    });
    
  } catch (error) {
    console.error('Account verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify account', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 