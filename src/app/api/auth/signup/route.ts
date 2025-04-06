import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { WalletUtils } from '@/utils/walletUtils';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 409 }
      );
    }

    // Create new wallet for the user
    const userId = `user_${Date.now()}`;
    const newWallet = WalletUtils.generateWallet(userId);

    // Manually hash the password to ensure it's done correctly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Password hashing debug:', {
      originalPasswordType: typeof password,
      passwordLength: password.length,
      saltGenerated: !!salt,
      hashedPasswordType: typeof hashedPassword,
      hashedPasswordLength: hashedPassword.length
    });

    // Create new user with hashed password
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword, // Manual hashing instead of relying on pre-save hook
      name: name || email.split('@')[0],
      walletAddress: newWallet.walletAddress
    });

    // Save user to database
    await user.save();

    // Return success response (without password)
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      walletAddress: newWallet.walletAddress
    };

    return NextResponse.json({
      user: userResponse,
      message: 'User registered successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Return proper error response
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
} 