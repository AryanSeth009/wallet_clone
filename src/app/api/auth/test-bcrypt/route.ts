import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { password, hash } = await req.json();
    
    console.log('Testing bcrypt with:', {
      password: typeof password,
      passwordValue: password,
      hash: typeof hash,
      hashValue: hash?.substring(0, 10) + '...',
      hashLength: hash?.length
    });
    
    // Try without any try/catch to see raw error
    let result;
    let error = null;
    
    try {
      // Manually hash a test password
      const testHash = await bcrypt.hash('test123', 10);
      
      // Test compare functions
      const compareTest = await bcrypt.compare('test123', testHash);
      const compareUserInput = await bcrypt.compare(password, hash);
      
      result = {
        testHashGenerated: testHash,
        testCompareWorked: compareTest,
        userCompareResult: compareUserInput
      };
    } catch (err: unknown) {
      error = {
        message: err instanceof Error ? err.message : 'Unknown error',
        name: err instanceof Error ? err.name : 'Error',
        stack: err instanceof Error ? err.stack : undefined
      };
    }
    
    return NextResponse.json({
      success: !error,
      result: result,
      error: error,
      passwordType: typeof password,
      hashType: typeof hash
    });
  } catch (error) {
    console.error('Test bcrypt error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 