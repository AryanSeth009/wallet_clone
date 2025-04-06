import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get('coin');
    const days = searchParams.get('days');

    console.log('Fetching crypto data:', { coin, days });

    if (!coin || !days) {
      console.error('Missing parameters:', { coin, days });
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;
    console.log('Calling CoinGecko API:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('CoinGecko API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.prices || !Array.isArray(data.prices)) {
      console.error('Invalid data format received:', data);
      throw new Error('Invalid data format received from CoinGecko');
    }

    console.log('Successfully fetched crypto data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in crypto API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
