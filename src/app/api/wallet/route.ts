import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { WalletService } from '@/services/WalletService';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const walletService = new WalletService();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { type, name, address, balance, privateKey } = data;

    const wallet = await walletService.createWallet(session.user.id, name);

    return NextResponse.json(wallet);
  } catch (error: any) {
    console.error('Error creating wallet:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create wallet' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wallets = await WalletService.getUserWallets(session.user.id);
    return NextResponse.json(wallets);
  } catch (error: any) {
    console.error('Error fetching wallets:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch wallets' },
      { status: 500 }
    );
  }
}
