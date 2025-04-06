import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Wallet from '@/models/Wallet';

export async function PUT(
  req: Request,
  { params }: { params: { address: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { address } = params;
    const { balance } = await req.json();

    await dbConnect();

    const wallet = await Wallet.findOneAndUpdate(
      { walletAddress: address, userId: session.user.id },
      { balance },
      { new: true }
    ).select('-encryptedPrivateKey -encryptedMnemonic');

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    return NextResponse.json(wallet);
  } catch (error: any) {
    console.error('Error updating wallet balance:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update wallet balance' },
      { status: 500 }
    );
  }
}
